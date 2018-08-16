import { Component, OnInit } from '@angular/core';
import { TripService } from './../trip.service';
import { UserService } from './../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripcardComponent } from './../tripcard/tripcard.component';
import 'rxjs/add/operator/take';


@Component({
	selector: 'app-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{
	trip$;
	value: Date;
	constructor(private tripService: TripService, 
		private route: ActivatedRoute, 
		private router: Router,
		private userService: UserService
		) { 

	}

	ngOnInit(){
		let tripid = this.route.snapshot.paramMap.get('tripid');
		this.tripService.getTrip(tripid).take(1).subscribe(trip => {
			this.trip$ = trip
			console.log(this.trip$)
		});

	}

	confirmbooking(tripid, form){

		let objTrip = {
			tripid: tripid,
			trip: this.trip$,
			uid: (localStorage.uid) || null, //since booking up to this point is allowed as anonymous
			tripdate: form.tripdate,
			adults: form.adults,
			children: form.child	
		}

		console.log('objTrip', objTrip);
		localStorage.setItem('tripdetail', JSON.stringify(objTrip));


		this.router.navigate(['/trip', tripid, 'confirm']);

		}
	}
