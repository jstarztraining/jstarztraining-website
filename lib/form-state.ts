// Shared shape returned by dashboard form server actions (useFormState).
export type FormState = {
  fieldErrors?: Record<string, string>;
  error?: string;
  success?: string;
};
