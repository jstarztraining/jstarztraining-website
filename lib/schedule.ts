import type { Session } from '@prisma/client';

// The schedule is a recurring WEEKLY board, so we order by weekday + time-of-day
// (in Halifax time) rather than absolute date — a session's calendar week is
// irrelevant; only "which day, what time" matters.

export const SCHEDULE_TZ = 'America/Halifax';

// Monday-first week (training weeks run Wed→Sun in practice).
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weekdayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: SCHEDULE_TZ });
const hmFmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: SCHEDULE_TZ,
});

export function weekdayOf(d: Date): string {
  return weekdayFmt.format(d);
}

/* ── Weekday + time-of-day <-> instant ────────────────────────────────────────
 * The board is a repeating weekly view, so a session is really just "which day,
 * what time" — the calendar week its Date happens to land in is noise. These
 * helpers convert between that pair and the stored DateTime, always resolving
 * the wall clock in Halifax time. Doing the conversion explicitly (rather than
 * leaning on the server's local timezone) is what keeps an admin-entered 7:00 PM
 * from rendering as 4:00 PM on a UTC server.
 */

/** Mon-first options for the admin day picker. */
export const WEEKDAY_OPTIONS = WEEKDAYS.map((label, value) => ({ value, label }));

const offsetFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: SCHEDULE_TZ,
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Halifax's offset from UTC (ms) at a given instant — handles AST/ADT. */
function tzOffsetMs(utcMs: number): number {
  const parts = offsetFmt.formatToParts(new Date(utcMs));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  // hour12:false yields "24" for midnight in some engines.
  const asIfUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
  return asIfUtc - utcMs;
}

// Anchor week: Mon 2024-01-01 … Sun 2024-01-07. Every session is pinned to it so
// "Sunday 7:00 PM" keeps meaning exactly that, no matter when it was saved.
const ANCHOR_YEAR = 2024;
const ANCHOR_MONTH = 0; // January
const ANCHOR_MONDAY = 1;

/** The instant whose Halifax wall clock is the given weekday (0 = Mon) at h:m. */
export function weeklyInstant(weekday: number, hour: number, minute: number): Date {
  const day = ANCHOR_MONDAY + Math.min(Math.max(weekday, 0), 6);
  const wall = Date.UTC(ANCHOR_YEAR, ANCHOR_MONTH, day, hour, minute);
  // Two passes: the first offset is sampled at the wrong instant, the second
  // lands on the correct side of any DST boundary.
  const first = wall - tzOffsetMs(wall);
  return new Date(wall - tzOffsetMs(first));
}

/** Inverse of weeklyInstant: weekday index (0 = Mon) + "HH:mm", in Halifax time. */
export function weeklyParts(d: Date): { weekday: number; time: string } {
  const idx = WEEKDAYS.indexOf(weekdayOf(d));
  return { weekday: idx < 0 ? 0 : idx, time: hmFmt.format(d) };
}

/** Sort key: minutes since Monday 00:00 (weekday * 1440 + minutes of day). */
export function weeklySortKey(d: Date): number {
  const idx = WEEKDAYS.indexOf(weekdayOf(d));
  const [h, m] = hmFmt.format(d).split(':').map(Number);
  return (idx < 0 ? 7 : idx) * 1440 + h * 60 + m;
}

export function sortSessionsWeekly<T extends { startsAt: Date }>(sessions: T[]): T[] {
  return [...sessions].sort((a, b) => weeklySortKey(a.startsAt) - weeklySortKey(b.startsAt));
}

/** Group weekly-sorted sessions by weekday label, preserving weekday order. */
export function groupByWeekday(sessions: Session[]): { day: string; items: Session[] }[] {
  const sorted = sortSessionsWeekly(sessions);
  const groups: { day: string; items: Session[] }[] = [];
  for (const s of sorted) {
    const day = weekdayOf(s.startsAt);
    const last = groups[groups.length - 1];
    if (last && last.day === day) last.items.push(s);
    else groups.push({ day, items: [s] });
  }
  return groups;
}

const SHORT_DAY: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

export type WeekDayColumn = { day: string; short: string; items: Session[] };

/** A full Mon→Sun week, each day carrying its time-sorted sessions (empty = rest day). */
export function weekGrid(sessions: Session[]): WeekDayColumn[] {
  const sorted = sortSessionsWeekly(sessions);
  const byDay = new Map<string, Session[]>();
  for (const s of sorted) {
    const day = weekdayOf(s.startsAt);
    (byDay.get(day) ?? byDay.set(day, []).get(day)!).push(s);
  }
  return WEEKDAYS.map((day) => ({ day, short: SHORT_DAY[day], items: byDay.get(day) ?? [] }));
}
