import { Component, OnInit} from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { RatingService } from '../app.service';

@Component({
  selector: 'admin-component',
  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html',
  providers: [RatingService]
})
export class RatingsAdminComponent implements OnInit {
	
	ratingsContent = [];
	ratingsContentNotRead = [];
	ratingsContentRead = [];
	hasContent:boolean = true;
	averageRating:any = 0;
	pageReady:boolean = false;
	notRead:any = 0;
	read:Number = 0;

	constructor(private ratingService:RatingService, private titleService: Title) {}

	ngOnInit() {
		this.titleService.setTitle('Admin - Rating Widget -By Hlawuleka Maswanganyi');
	 	this.ratingService.getRatings().subscribe((response)=> {

	 		for(let i = 0;i<response.length;i++) {
	 			try {
		 			response[i].id = response[i]._id || response[i].id;
		 			if(!response[i].RatingRead) {
		 				this.ratingsContentNotRead.push(response[i]);
		 			} else {
		 				this.ratingsContentRead.push(response[i]);
		 			}

		 			this.averageRating += response[i].rating;
	 			}catch(e) {
	 				console.log(e);
	 			}
	 		}

	 		this.notRead = this.ratingsContentNotRead.length;
	 		this.read    = this.ratingsContentRead.length;

	 		if(this.notRead > 0 || this.read > 0){
	 			this.pageReady = true;
	 			this.averageRating = Math.round(this.averageRating/response.length * 100) /100;
	 		}

	 		(this.notRead+this.read) < 1 ?  this.hasContent = false : this.hasContent = true;
	 	});
 	}

 	messageRead(id, evt) {
		this.markRating(id, evt, 1, this.ratingsContentRead,this.ratingsContentNotRead);
 	}

 	unRead(id, evt) {
		this.markRating(id, evt, 0, this.ratingsContentNotRead, this.ratingsContentRead);
 	}

 	markRating(id, evt, shiftType, undreadArray, readArray) {
 		evt.preventDefault();
 		let tmpContent = readArray;
					
		for(let x = 0;x<tmpContent.length;x++) {
			if(tmpContent[x].id == id) {

				//Map read element and stack it to the unread array before deleting it
				undreadArray.push(readArray[x]);
				
				//Instant removal of the clicked item
				readArray.splice(x, 1);

			}
		}

		this.notRead = shiftType != 1 ? undreadArray.length : tmpContent.length;
		this.read = shiftType == 1 ? undreadArray.length : tmpContent.length;

 		this.ratingService.updateRating(id, shiftType).subscribe(
			data => {
				if(!data.success) {
					console.log('Error occured while updating content.');
				}
			},
			error => console.log(error)
		);
 	}
}