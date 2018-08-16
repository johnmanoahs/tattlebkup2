import { Component, OnInit } from '@angular/core';
import { TripService } from './../trip.service';
import { UserService } from './../user.service';
import { TripcardComponent } from './../tripcard/tripcard.component';
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	trips$;
	startAt = new Subject()
	endAt = new Subject()
	lastKeypress: number = 0;  // event timestamp in milliseconds
	user$;
	featuredTrips$;
  constructor(private tripService: TripService, private  userService: UserService) { 
  	this.featuredTrips$ = this.tripService.getFeaturedTrips();
  }

  ngOnInit() {
  	this.tripService.searchTrips(this.startAt, this.endAt).subscribe(trips$ => this.trips$ = trips$)
  }

  search($event) {
  	if ($event.timeStamp - this.lastKeypress > 200) {
	  	let q = $event.target.value
	  	this.startAt.next(q)
	    this.endAt.next(q+"\uf8ff")
	  }
  }

 // searchTrips(query){
 // 	console.log(query);
 // 	this.trips$ = this.tripService.searchTrips(query);
 // }

 getUser(uid){
 	return this.userService.get(uid);
 }

}
