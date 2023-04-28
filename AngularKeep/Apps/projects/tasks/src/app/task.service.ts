import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';
import { apiUrl } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = apiUrl + 'Task'; // Task API endpoint

  constructor(public http: HttpClient) {}

  // GET all Tasks
  getTasks(page?: number): Observable<Task[]> {
    if (page) {
      console.info('TaskService: GET PageNumber:' + page);
      return this.http.get<Task[]>(this.url + '?PageNumber=' + page);
    } else {
      console.info('TaskService: GET');
      return this.http.get<Task[]>(this.url);
    }
  }

  // GET Task by ID
  getTask(taskId: number): Observable<any> {
    console.info('TaskService: GET noteId:', taskId);
    return this.http.get<Task>(this.url + '/' + taskId);
  }

  // POST Task
  postTask(task: Task): Observable<any> {
    console.info('TaskService: POST', task);
    return this.http.post<Task>(this.url, task);
  }

  // PUT Task
  putTask(task: Task): Observable<any> {
    console.info('TaskService: PUT', task);
    return this.http.put<Task>(this.url, task);
  }

  // DELETE Task
  deleteTask(taskId: number): Observable<any> {
    console.info('TaskService: DELETE', taskId);
    return this.http.delete<any>(this.url + '/' + taskId);
  }
}
