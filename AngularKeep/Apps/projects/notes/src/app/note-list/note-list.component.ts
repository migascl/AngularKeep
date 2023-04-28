import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../note';
import { Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  @Input() notes: Note[] | undefined;
  @Output() deleteNoteCallback: EventEmitter<number> = new EventEmitter();

  constructor(private noteService: NoteService, private router: Router) {
    console.warn('NoteListComponent: Called');
  }

  // Navigate to note with id
  openNote(noteId?: number) {
    console.info('NoteListComponent: Navigating to note', noteId);
    this.router.navigate(['.'], { queryParams: { note: noteId } });
  }

  // Callback note delete function
  deleteNote(noteId?: number) {
    console.info('NoteListComponent: Calling deleteNote', noteId);
    this.deleteNoteCallback.emit(noteId);
  }
}
