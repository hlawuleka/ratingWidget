import { Component, OnInit} from '@angular/core';
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

	constructor(private ratingService:RatingService) {}

	ngOnInit() {
	 	this.ratingService.getRatings().subscribe((response)=> {
	 		
	 		for(let i = 0;i<response.length;i++) {
	 			try {
		 			response[i].id = response[i]._id;
		 			if(!response[i].RatingRead) {
		 				this.ratingsContentNotRead.push(response[i]);
		 			} else {
		 				this.ratingsContentRead.push(response[i]);
		 			}
	 			}catch(e) {
	 				console.log(e);
	 			}
	 		}

	 		(this.ratingsContentRead.length+this.ratingsContentNotRead.length) < 1 ?  this.hasContent = false : this.hasContent = true;
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

							}
						}

					}
				},
				error => console.log(error)
			);
 	}
}