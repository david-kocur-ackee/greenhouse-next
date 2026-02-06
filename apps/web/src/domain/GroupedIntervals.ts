import Interval from "./Interval";
import type { WeekDay } from "./WeekDay";

export type GroupedIntervals = { [key in WeekDay]: Interval[] };
