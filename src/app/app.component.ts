import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 	btnText:string 	   = 'Rate';
 	RateMessage:string = 'Thanks for visiting our page, would you please tell us a bit about your experience ?';
 	isFormOpen:boolean = false;

 	//@Input fields
 	emailAddress:string = '';

 	openRatingForm():boolean{
 		return this.isFormOpen = !this.isFormOpen;
 	}

 	substring (val) {
 		return val.substring(0, val.indexOf('@'));
 	}
}
