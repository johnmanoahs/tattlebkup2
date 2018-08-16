import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { TripService } from './../trip.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user$;
  mytrips$;
  defaultDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  uid;
  constructor(private userService: UserService, 
    private route: ActivatedRoute,
    private tripService: TripService
    ) 
  { 
  	
    this.uid = route.snapshot.paramMap.get('uid');
  	//this.user$ = this.userService.get(uid);
  	this.userService.get(this.uid).take(1).subscribe(user =>{
  		this.user$ = user;
  		console.log(user);
  	})
    this.tripService.getTrips(this.uid).subscribe(trips => {
      this.mytrips$ = trips;
      console.log(this.mytrips$)
    })
  }

  ngOnInit() {
  }

}