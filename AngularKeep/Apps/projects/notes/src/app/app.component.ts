import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Notes';
  notes: Note[] | undefined;
  loading: boolean = false;

  constructor(
    private noteService: NoteService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    console.warn('AppComponent: Called');
    // Run function when route contains query for "note", opening a note dialog
    // if query equals to "new" open empty
    route.queryParams.subscribe(params => {
      if (params['note'] === 'new') {
        this.openNote();
      } else if (params['note']) {
        this.openNote(params['note']);
      }
    });
  }

  // Get notes on init
  ngOnInit() {
    console.info('AppComponent: Initializing...');
    this.getNotes();
  }

  // Get notes from API and save in cache
  public getNotes() {
    console.info('AppComponent: Getting all notes...');
    this.loading = true;
    this.noteService.getNotes().subscribe(
      response => {
        console.info('AppComponent: Got notes', response);
        this.notes = response ? (response as Note[]) : [];
      },
      error => {
        console.error('AppComponent: Error getting notes', error);
        this.openSnackBar('There was an error with the server!');
        this.loading = false;
      },
      () => {
        console.info('AppComponent: Finished getting notes', this.notes);
        this.loading = false;
      }
    );
  }

  // Open note based on ID
  openNote(noteId?: number) {
    // Open dialog
    console.log('AppComponent: Dialog opened', noteId);
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      data: noteId,
      minWidth: 500,
    });

    // Refresh content after dialog closed based on dialog ref message.
    dialogRef.afterClosed().subscribe(result => {
      console.log('AppComponent: Dialog closed', result);
      this.router.navigate(['.'], { relativeTo: this.route });
      if (result === true) {
        this.getNotes();
      }
    });
  }

  deleteNote(noteId?: number) {
    console.info('AppComponent: Deleting note', noteId);
    this.noteService.deleteNote(noteId!).subscribe(
      response => {
        console.info('AppComponent: Deleted note', noteId);
        this.openSnackBar('Note deleted.');
      },
      error => {
        console.error('AppComponent: Error delering note ' + noteId, error);
        this.openSnackBar('Error deleting note');
      },
      () => {
        console.info('AppComponent: Finished deleting note', noteId); //This is actually not needed
        this.getNotes();
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }
}
