import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LogOutDialogComponent} from "./shared/components/log-out-dialog/log-out-dialog.component";
import {DiagnosisDialogComponent} from "./shared/components/diagnosis-dialog/diagnosis-dialog.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    DiagnosisDialogComponent,
    LogOutDialogComponent,
    PageNotFoundComponent,
    SidenavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
