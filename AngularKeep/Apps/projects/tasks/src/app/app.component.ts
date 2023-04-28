import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Tasks';
  page = 1;
  tasks: Task[] | undefined;
  loading: boolean = false;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  // Get tasks on init
  ngOnInit() {
    console.info('AppComponent: Initializing...');
    this.getTasks();
  }

  // Get tasks from API and save in cache
  public getTasks() {
    console.info('AppComponent: Getting all tasks...');
    this.loading = true;
    this.taskService.getTasks().subscribe(
      response => {
        console.info('AppComponent: Got tasks', response);
        this.tasks = response ? (response as Task[]) : [];
      },
      error => {
        console.error('AppComponent: Error getting tasks', error);
        this.openSnackBar('There was an error with the server!');
        this.loading = false;
      },
      () => {
        console.info('AppComponent: Finished getting tasks', this.tasks);
        this.loading = false;
      }
    );
  }

  onScroll(): void {
    this.taskService.getTasks(++this.page).subscribe((tasks: Task[]) => {
      this.tasks?.push(...tasks);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }
}
