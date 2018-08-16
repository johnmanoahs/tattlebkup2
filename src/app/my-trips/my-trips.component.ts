import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { TripService } from './../trip.service';

@Component({
  selector: 'app-trips-orders',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
  mybookings$;
  constructor(private userService: UserService, private tripService: TripService ) { 
  	


  	// .subscribe(mybookings => {
  	// 	this.mybookings = mybookings
  	// 	console.log(this.mybookings)
  	// });
  }

  getTrip(id){
  	this.tripService.getTrip(id);
  }

  // getMyTrips(){
  //   this.mybookings$ = this.tripService.getMyTrips();
  // }

  ngOnInit() {
    this.tripService.getMyBookings().subscribe(trips => {
      this.mybookings$ = trips;
      console.log('this.mybookings', this.mybookings$);
    });

  	// this.mybookings$ = this.userService.getMyBookings(); 
  	// console.log(this.mybookings$);
  }

}
