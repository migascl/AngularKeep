import { Component, Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
})
export class NoteDialogComponent {
  loading: boolean = true;
  note: Note | undefined;

  form = this.fb.group({
    title: '',
    content: ['', [Validators.required]],
  });

  constructor(
    private dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private noteService: NoteService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    console.warn('NoteDialogComponent: Called');

    // If default data provided, get note data from api
    if (data) {
      console.info('NoteDialogComponent: Getting note', data);
      this.noteService.getNote(data).subscribe(
        response => {
          console.info('NoteDialogComponent: Got note', response);
          this.note = response as Note;
          this.form.setValue({
            content: this.note.content ?? null,
            title: this.note.title ?? null,
          });
          console.info('NoteDialogComponent: Form values set', this.form);
        },
        error => {
          console.error('NoteDialogComponent: Error getting note', error);
          this.closeNote(false);
          this.openSnackBar('Could not find note.');
        },

        () => {
          console.info('NoteDialogComponent: Finished getting note', this.note); //This is actually not needed
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  // Close Note
  // Receives flag to refresh content
  closeNote(refresh?: boolean) {
    console.log('NoteComponent: Closing dialog', refresh);
    this.dialogRef.close(refresh);
  }

  // Submit note
  // If default data was provided, update existing note - create new note otherwise
  submitNote() {
    console.log('NoteComponent: Submiting note');
    this.loading = true;
    if (this.note?.noteId) {
      console.log('NoteComponent: Updating note', this.note?.noteId);
      this.note = Object.assign(this.note, this.form.value);
      this.noteService.putNote(this.note).subscribe(
        response => {
          console.info('NoteComponent: Updated note', this.note);
          this.closeNote(true);
          this.openSnackBar('Note updated.');
        },
        error => {
          console.error('Request failed with error', error);
          this.openSnackBar('Error updating note!');
          this.loading = false;
        },
        () => {
          console.info(
            'NoteDialogComponent: Finished updating note',
            this.note!.noteId
          );
        }
      );
    } else {
      console.log('NoteComponent: Creating note');
      this.note = new Note(
        new Date(),
        this.form.value.content!,
        this.form.value.title ?? undefined
      );
      this.noteService.postNote(this.note).subscribe(
        response => {
          console.info('NoteComponent: Created note', this.note);
          this.openSnackBar('Note created.');
          this.closeNote(true);
        },
        error => {
          console.error('Request failed with error', error);
          this.openSnackBar('Error creating note!');
          this.loading = false;
        },
        () => {
          console.info('NoteDialogComponent: Finished creating note');
        }
      );
    }
  }

  // Delete note
  deleteNote() {
    console.info('NoteDialogComponent: Deleting note', this.note?.noteId!);
    this.noteService.deleteNote(this.note?.noteId!).subscribe(
      response => {
        console.info('NoteDialogComponent: Deleted note', response);
        this.openSnackBar('Note deleted.');
        this.closeNote(true);
      },
      error => {
        console.error('NoteDialogComponent: Error delering note ', error);
        this.openSnackBar('Error deleting note!');
        this.loading = false;
      },
      () => {
        console.info(
          'NoteDialogComponent: Finished deleting note',
          this.note?.noteId!
        );
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }
}
