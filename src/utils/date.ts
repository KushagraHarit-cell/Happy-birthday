/**
 * Checks if a date has passed relative to the current time.
 */
export function isDatePassed(dateStr: string): boolean {
  const targetDate = new Date(dateStr);
  const now = new Date();
  return now.getTime() >= targetDate.getTime();
}

/**
 * Interface representing a duration of time.
 */
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

/**
 * Calculates the time remaining until a target date.
 */
export function getTimeRemaining(targetDateStr: string): TimeRemaining {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isCompleted: false };
}
