import type { Session } from "./session";

export interface Task {
  name: string;
  sessions: Session[];
}
