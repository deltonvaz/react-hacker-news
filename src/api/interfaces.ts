export type IStoryType = "top" | "new" | "ask" | "show";
export type IType = "job" | "story" | "comment" | "poll" | "pollopt";

export interface IStory {
  by?: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score?: number;
  time?: number;
  title?: string;
  type: IType;
  url?: string;
  dead?: boolean;
  deleted: boolean;
}
