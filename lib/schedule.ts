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
