import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { RatingsAdminComponent } from './admin/admin.component';
import { ModalComponent } from './modal/modal.component';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry.component';

const RatingAppRoutes: Routes = [
  
  { path: '',
     redirectTo: '/home',
     pathMatch: 'full'
  }, 
  { path: 'home',
    component: AppComponent
  },
  {
    path: 'admin',
    component: RatingsAdminComponent
  },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    EntryComponent,
    RatingsAdminComponent
  ],
  imports: [
    RouterModule.forRoot(RatingAppRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [EntryComponent]
})
export class AppModule { }
