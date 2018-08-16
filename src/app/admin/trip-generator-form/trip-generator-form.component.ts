import { Component, OnInit } from '@angular/core';
import { TripService } from './../../trip.service';
import { UserService } from './../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
	selector: 'app-trip-generator-form',
	templateUrl: './trip-generator-form.component.html',
	styleUrls: ['./trip-generator-form.component.css']
})
export class TripGeneratorFormComponent{
	value: Date;
	trip = {
		tripname: '',
		costadult: '',
		costchild: '',
		description: '',
		maxmembers: '',
		meetingaddress: '',
		meetinglocation: '',
		minmembers: '',
		notice: '',
		tattlerdetails:{},
		transportation: '',
		tripenddate: '',
		tripendtime:'',
		tripimage:'',
		triplength:'',
		tripstartdate:'',
		tripstarttime:'',

		adults: '',
		bookerdetails: {},
		children: '',
		childtotal: '',
		datebooked: '',
		grandtotal: '',
		paymentmode: '',
		trip: {

		},
		tripdate: '',
		tripid: '',
		uid: ''
	};
	id;
	constructor(private tripService: TripService, 
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService
		) { 

		this.id = this.route.snapshot.paramMap.get('id');
		if(this.id){
			this.tripService.getTrip(this.id).take(1).subscribe(trip => {
				this.trip = trip;

			});
			
		}
	}

	createTrip(trip){
		console.log(trip);
		if(this.id) this.tripService.updateTrip(this.id, trip);
		else {
			let tattler;
			this.userService.get(localStorage.getItem('uid')).take(1).subscribe(tattler =>{
				tattler = tattler;
				console.log(tattler.details);
				trip.tattlerdetails = tattler.details;
				trip.tattlerdetails.tattlerid = localStorage.getItem('uid');
				console.log(trip);
				this.tripService.createTrip(trip);
			})
			
		}
		
		this.router.navigate(['/tattler/trips']);
	}



}
