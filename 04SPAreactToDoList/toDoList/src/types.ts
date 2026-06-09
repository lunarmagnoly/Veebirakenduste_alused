export type Status = "idea" | "progress" | "done";

export type Priority = "low" | "medium" | "high";

export type ToDo = {
  id: number;
  text: string;
  description: string;
  imageUrl: string;
  status: Status;
  deadline: string;
  completedDate: string;
  priority: Priority;
  favorite: boolean;
};

export type UpdatedProject = {
  text: string;
  description: string;
  imageUrl: string;
  deadline: string;
  priority: Priority;
};