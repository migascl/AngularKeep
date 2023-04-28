import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './note';
import { apiUrl } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  url = apiUrl + 'Note'; // Note API endpoint

  constructor(public http: HttpClient) {}

  // GET all Notes
  getNotes(): Observable<any> {
    console.info('NoteService: GET');
    return this.http.get<any[]>(this.url);
  }

  // GET Note by ID
  getNote(noteId: number): Observable<any> {
    console.info('NoteService: GET noteId:', noteId);
    return this.http.get<any>(this.url + '/' + noteId);
  }

  // POST Note
  postNote(note: Note): Observable<any> {
    console.info('NoteService: POST', note);
    return this.http.post<Note>(this.url, note);
  }

  // PUT Note
  putNote(note: Note): Observable<any> {
    console.info('NoteService: PUT', note);
    return this.http.put<Note>(this.url, note);
  }

  // DELETE Note
  deleteNote(noteId: number): Observable<any> {
    console.info('NoteService: DELETE', noteId);
    return this.http.delete<any>(this.url + '/' + noteId);
  }
}
