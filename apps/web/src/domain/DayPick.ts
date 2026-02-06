import type { WeekDay } from "src/domain/WeekDay";

export interface DayPick {
  day: WeekDay;
  picked: boolean;
}
