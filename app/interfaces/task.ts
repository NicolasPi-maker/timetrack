import type { Session } from "./session";

export interface Task {
  id: string;
  name: string;
  sessions: Session[];
}
