import { Http, Response, Headers } from "@angular/http";

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

@Injectable()
export class RatingService {
	headers = new Headers({'Content-type':'application/json'});
	// url:string = 'http://localhost:3000/ratings';
	url:string = 'https://nodejshlawuleka.herokuapp.com/ratings/';
	constructor(private http:Http){}
	

	sendRating(body){
	
		return this.http.post(this.url, body, {headers:this.headers}).
		       map((response: Response)=>response.json()).
			   catch((response:Response)=>Observable.throw(response.json()));
	}
	getRatings(){
		return this.http.get(this.url).
		    map((response: Response)=>{
		       	return response.json().ratingsData;
	        }).
		    catch((response:Response)=>Observable.throw(response));
	}
	updateRating(id){
		return this.http.patch(this.url+'/'+id, {'id':id}).
		    map((response: Response)=>response.json()).
		    catch((response:Response)=>Observable.throw(response));
	}
}