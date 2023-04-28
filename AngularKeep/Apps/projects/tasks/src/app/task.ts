// Task Model
export class Task {
  taskId: number | undefined;
  date: Date;
  name: string;
  dueDate: Date | undefined;
  completed: boolean;

  constructor(
    date: Date,
    name: string,
    completed: boolean,
    dueDate?: Date,
    taskId?: number
  ) {
    this.taskId = taskId;
    this.date = date;
    this.name = name;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}
