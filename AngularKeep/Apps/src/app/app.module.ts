import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppNavComponent } from './app-nav/app-nav.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, AppNavComponent, AppFooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
  ],
  exports: [AppNavComponent, AppFooterComponent],
  providers: [],
  entryComponents: [AppNavComponent, AppFooterComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    customElements.define(
      'app-nav',
      createCustomElement(AppNavComponent, { injector: this.injector })
    );
    customElements.define(
      'app-footer',
      createCustomElement(AppFooterComponent, { injector: this.injector })
    );
  }
}
