import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './../event.service';
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
	displayEvent: any;
	calendarOptions: Options;
	@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

	trip$;
	value: Date;
	daySelected;
	tattlerBookedDates;
	atattlerBookedDates='[';
	j =0;
	 // = [
		// 					{start: '2018-08-27',end: '2018-08-27',rendering: 'background'},
		// 					{start: '2018-08-29',end: '2018-08-29',rendering: 'background'}
		// 				]

	constructor(private tripService: TripService, 
		private route: ActivatedRoute, 
		private router: Router,
		private userService: UserService,
		protected eventService: EventSesrvice
		) { 

	}

	ngOnInit(){


		// this.eventService.getEvents().subscribe(data => {
		// 	this.calendarOptions = {
		// 		editable: false,
		// 		eventLimit: false,
		// 		//hiddenDays: [ 2, 4 ],
		// 		header: {
		// 			left: 'prev,next',
		// 			center: 'title',
		// 			right: 'today'
		// 		},
		// 		events: this.tattlerBookedDates
		// 	};
		// });


		let tripid = this.route.snapshot.paramMap.get('tripid');
		this.tripService.getTrip(tripid).take(1).subscribe(trip => {
			this.trip$ = trip;
			console.log('TRIP : ', this.trip$);
			console.log('tattlerID: : ', trip.tattlerdetails.tattlerid);
			this.userService.get(this.trip$.tattlerdetails.tattlerid).subscribe(tattler1 => {
				console.log('tattler1:  : ', tattler1)
				this.tattlerBookedDates = tattler1;
				this.tattlerBookedDates = this.tattlerBookedDates.details.bookeddates;
				console.log('bookeddates : ', this.tattlerBookedDates);
				
				for(let i in this.tattlerBookedDates){
					console.log(this.tattlerBookedDates[i].start);
					let tripdate = new Date(this.tattlerBookedDates[i].start);
					tripdate = this.addDays(tripdate, -1);
					console.log(tripdate.toISOString());
					//let tripdatet = tripdate.getFullYear() + "-" + tripdate.getMonth() + "-" + tripdate.getUTCDate();
					//console.log("TRIPDATE:::", tripdatet);
					this.atattlerBookedDates += '{ "start": "'+tripdate.toISOString().split('T')[0]+'", "end": "'+ tripdate.toISOString() + '", "rendering": "background"},';
					//this.atattlerBookedDates += '{ "start": "'+this.tattlerBookedDates[i].start+'", "end": "'+this.tattlerBookedDates[i].start+'", "rendering": "background"},';
					
					// this.atattlerBookedDates[this.j].start = this.tattlerBookedDates[i].start;
					// this.atattlerBookedDates[this.j].end = this.tattlerBookedDates[i].start;
					// this.atattlerBookedDates[this.j].rendering = 'background';
					// this.j++;
				}
				this.atattlerBookedDates = this.atattlerBookedDates.substring(0, this.atattlerBookedDates.length-1);
				this.atattlerBookedDates += "]";
				this.atattlerBookedDates = JSON.parse(this.atattlerBookedDates);
				console.log("this.atattlerBookedDates : : ", this.atattlerBookedDates);
				
				this.eventService.getEvents().subscribe(data => {
			this.calendarOptions = {
				editable: false,
				eventLimit: false,
				//hiddenDays: [ 2, 4 ],
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'today'
				},
				events: this.atattlerBookedDates
			};
		});

			});

			//this.userService.get(this.trip$.tattlerdetails.uid).subscribe()
		});

		//this is to retrieve the bookeddates for the tattler. This needs to be revisited as having a 
		//separate subscription to userService for just bookeddates is not very efficient



	}

	

	dayClick(model: any){
		console.log(model.date._d, model, this);
		this.daySelected = this.addDays(model.date._d, 1); //For some reason the dates show one day less. Applying this fix.
		console.log("TIMESTAMP:::", Date.parse(this.daySelected));
	}

	addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }





confirmbooking(tripid, form){

	let objTrip = {
		tripid: tripid,
		trip: this.trip$,
			uid: (localStorage.uid) || null, //since booking up to this point is allowed as anonymous
			tripdate: Date.parse(this.daySelected),
			adults: form.adults,
			children: form.child	
		}

		console.log('objTrip', objTrip);
		localStorage.setItem('tripdetail', JSON.stringify(objTrip));


		this.router.navigate(['/trip', tripid, 'confirm']);

	}
}
