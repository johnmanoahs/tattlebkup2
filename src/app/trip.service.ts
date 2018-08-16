import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Injectable()
export class TripService {

	dburl = '/tattlers/' + localStorage.getItem('uid') + '/trips';
	uid = localStorage.getItem('uid');

	constructor(private db: AngularFireDatabase) { }

	createTrip(trip){
		//trip.uid = localStorage.getItem('uid');
		return this.db.list('/trips').push(trip);
	}

	getTrips(profileuid?){
		let uid = (profileuid)? profileuid : this.uid;
		return this.db.list('/trips', {
			query: {
				orderByChild: 'tattlerdetails/tattlerid',
				equalTo: uid
			}
		});
	}

	// getTrips(start, end): FirebaseListObservable<any> {
 //    return this.db.list('/trips', {
 //      query: {
 //        orderByChild: 'tripname',
 //        limitToFirst: 10,
 //        startAt: start,
 //        endAt: end
 //      }
 //    });
 //  }



	getTrip(tripid){
		return this.db.object('trips/' + tripid);
	}

	updateTrip(tripid, trip){
		return this.db.object('trips/' + tripid).update(trip);
	}

	deleteTrip(tripid){
		return this.db.object('trips/' + tripid).remove();
	}

	searchTrips(start, end): FirebaseListObservable<any> {
    return this.db.list('/trips', {
      query: {
        orderByChild: 'tripname',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }

	// searchTrips(query){

	// 	return this.db.list('/trips', {
	// 		query: {
	// 			orderByChild: "tripname",
	// 			startAt: query
	// 		}
	// 	})
	// }

	getMyTrips(){

	}

	createBooking(trip){
		//console.log(trip);
		// this.db.list('tattlers/' + trip.uid + '/' + 'mybookings').push(trip);
		// return this.db.list('tattlers/' + trip.trip.tattlerdetails.tattlerid + '/' + 'myadminbookings').push(trip);
		return this.db.list('bookings/').push(trip);
	}

	getMyBookings(){
		//return this.db.list('tattlers/' + localStorage.getItem('uid') + '/myadminbookings');
		return this.db.list('bookings/', {
			query: {
				orderByChild: 'uid',
				equalTo: localStorage.getItem('uid')
			}
		})
	}

	getBookingsForMe(){
		return this.db.list('bookings/', {
			query: {
				orderByChild: 'trip/tattlerdetails/tattlerid',
				equalTo: localStorage.getItem('uid')
			}
		})
	}


	setStatusbooking(status, bookingid){
		let update = {status : status}
		alert(bookingid);
		return this.db.object('bookings/' + bookingid).update(update);
	}

	getFeaturedTrips(){
		return this.db.list('trips/', {
			query: {
				orderByChild: 'featured',
				equalTo: true
			}
		})
	}











}
