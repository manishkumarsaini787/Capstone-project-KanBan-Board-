import { Task } from "./task"

export type Status =
{
  "statusId"?: Number,
  "status"?: String,
  "tasks"?: [Task]
}
