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
		 			response[i].id = response[i]._id;
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

 		evt.preventDefault();

 		this.ratingService.updateRating(id).subscribe(
			data => {
				if(data.success) {
					let tmpContent = this.ratingsContentNotRead;
					
					for(let x = 0;x<tmpContent.length;x++) {
						if(tmpContent[x].id == id) {

							//Map unread element and stack it to the read array before deleting it
							this.ratingsContentRead.unshift(this.ratingsContentNotRead[x]);
							
							//Instant removal of the clicked item
							this.ratingsContentNotRead.splice(x, 1);

							this.notRead = this.ratingsContentNotRead.length;
 							this.read    = this.ratingsContentRead.length;

						}
					}

				}
			},
			error => console.log(error)
		);
 	}
}