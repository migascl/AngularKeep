// Note Model
export class Note {
  noteId: number | undefined;
  date: Date;
  title: string | undefined;
  content: string;

  constructor(date: Date, content: string, title?: string, noteId?: number) {
    this.noteId = noteId;
    this.date = date;
    this.title = title;
    this.content = content;
  }
}
