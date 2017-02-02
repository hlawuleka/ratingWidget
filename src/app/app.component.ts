import { Component } from '@angular/core';

import { RatingService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 	
	//@Member properties
 	btnText:string 	   = 'Rate';
 	RateMessage:string = 'Thanks for visiting our page, would you please tell us a bit about your experience ?';
 	isFromOpen:boolean = false;
 	ratingValue:number = 0;

 	//@Member Input fields
 	emailAddress:string = '';
 	userFeedback:string = '';
 	
 	formErrors = {
 		message: ''
 	};

 	toSendToServer = {
 		email: '',
 		message:'',
 		ratingValue:0
 	};

 	constructor(private ratingService:RatingService){

 	}
 	//@member functions
 	openRatingForm () :boolean{
 		return this.isFromOpen = !this.isFromOpen;
 	}

 	substring (val) {
 		return val.substring(0, val.indexOf('@'));
 	}

 	removeActive (elements) {
 		for(let i =1;i <=elements.length;i++) {
 			document.getElementById(i.toString()).classList.remove('active');
 		}
 	}

 	rateService (evt) {
 		let from = evt.target.getAttribute('id');

 		let getStars = document.getElementsByClassName('stars');

 		this.removeActive(getStars);
 		this.ratingValue = from;

 		for(let i = 1;i <=from;i++) {

 			let currentStar = document.getElementById(i.toString());
 			
 			currentStar.classList.add('active');
 		}
 	}

 	sendRatingData () {
 		//validate
 		let emailAddress=this.emailAddress;
 		let userFeedback=this.userFeedback;

 		let emailRegExp = /^([A-Za-z0-9_\.\-])+\@([A-Za-z0-9_\.\-])+\.([net|com|co.za|info|biz|edu|ac.za|org|int|mil|gov])+$/;

 		if(emailAddress.match(emailRegExp) && userFeedback.length > 0 && this.ratingValue > 0) {
 			
 			this.formErrors.message = '';

 			this.toSendToServer.email = emailAddress;
 			this.toSendToServer.message = userFeedback;
 			this.toSendToServer.ratingValue = this.ratingValue;

 			this.ratingService.sendRating(this.toSendToServer).subscribe(
				data => console.log(data),
				error => console.log(error)
			);
 		}
 		else{
 			 this.formErrors.message = 'Please make sure you enter a valid email address and click a star.';
 		}
 	}
}
