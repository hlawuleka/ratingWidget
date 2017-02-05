import { Component } from '@angular/core';

import { ModalComponent } from './modal/modal.component';

import { RatingService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RatingService]
})
export class AppComponent {
 	
	//@Member properties
 	btnText:string 	   = 'Rate';
 	platform:string    = 'site';
 	RateMessage:string = 'Hey there, thanks for visiting our page, would you please tell us a bit about your experience on our '+this.platform;
 	isFormOpen:boolean = true;
 	ratingValue:number = 0;
 	ratingComplete:boolean = true;
 	waiting:boolean =  false;
 	//@Member Input fields
 	emailAddress:string = '';
 	userFeedback:string = 'I love your website because ';
 	
 	formErrors = {
 		message: ''
 	};

 	//@Server updated properties
 	ratingResponse:any = {
 		title: '',
 		message: '',
 		status: true
 	}
 	constructor(private ratingService:RatingService){

 	}
 	//@member functions
 	openRatingForm () :boolean{
 		return this.isFormOpen = !this.isFormOpen;
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
 			this.waiting = true;
 			this.ratingService.sendRating({
 				'email'   : emailAddress,
 				'message' : userFeedback,
 				'rating'  : this.ratingValue
 			}).subscribe(
				data => {
					this.ratingResponse.title   = data.title;
					this.ratingResponse.message = data.message;
					this.ratingResponse.status = data.status;

					if(this.ratingResponse.status) {
						this.ratingComplete = false;
						document.getElementById('showPopup').click();
					}
				},
				error => console.log(error)
			);
 		}
 		else{
 			 this.formErrors.message = 'Please make sure you enter a valid email address, type in your message and click a star.';
 		}
 	}
}
