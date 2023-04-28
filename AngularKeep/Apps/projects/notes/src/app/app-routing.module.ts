import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  Router,
  NavigationEnd,
  NavigationStart,
  RouterEvent,
} from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: NoteListComponent,
    children: [{ path: 'note', component: NoteDialogComponent }],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private route: Router) {
    console.warn('AppRouting: Called');

    // If on an iframe, force redirection to url in top bar
    if (window.top?.location.href != window.location.href) {
      this.route.navigateByUrl(
        window.top!.location.href.substring(
          window.top!.location.href.indexOf('/notes') + 7
        )
      );
    }

    var topHref =
      window.top?.location.href != window.location.href
        ? window.top?.location.href.substring(
            0,
            window.top.location.href.indexOf('/notes') + 6
          )
        : null;

    this.route.events.subscribe(e => {
      // At the end of navigation event, replace top bar url
      if (e instanceof NavigationEnd) {
        if (topHref) {
          window.top?.history.replaceState(
            window.top.history.state,
            window.top.document.title,
            topHref + e.urlAfterRedirects
          );
        }
      }
    });
  }
}
