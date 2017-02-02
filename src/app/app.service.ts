import { Http, Response } from "@angular/http";

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

@Injectable()
export class RatingService {
	constructor(private http:Http){}

	sendRating(body){
		return this.http.post('http://localhost/testServer/test.php', {email:'12'}).
		       map((response: Response)=>response.json()).
			   catch((response:Response)=>Observable.throw(response.json()));
	}
}