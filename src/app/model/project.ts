import { Status } from "./status"

export type Project =
{
  "projectId"?: Number,
  "projectTitle"?: String,
  "email"?: String,
  "statusList"?: [Status],
  "members"?: [String]
}
