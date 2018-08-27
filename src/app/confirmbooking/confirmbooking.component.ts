import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { TripService } from './../trip.service';
import { Router } from '@angular/router';
import { TripcardComponent } from './../tripcard/tripcard.component';
import { UserService } from './../user.service';
import 'rxjs/add/operator/take';
declare let paypal: any;

@Component({
  selector: 'app-confirmbooking',
  templateUrl: './confirmbooking.component.html',
  styleUrls: ['./confirmbooking.component.css']
})
export class ConfirmbookingComponent implements OnInit, AfterViewChecked  {
	trip;
	trip$;
	adulttotal;
	childtotal;
	grandtotal: number;
    addScript: boolean = false;
  paypalLoad: boolean = true;
  
  finalAmount: number=0.01;
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AS-q2vpC-wfMbHEgCiUT6mgqFIF9nyjOeF2kKRIV1uDuepmAUrndQhqRcD2dMUM-qOfva34jS0gTSYc5',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'CAD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.book('PayPal');
      })
    }
  };


  constructor(
                private tripService: TripService, 
                private router: Router,
                private userService: UserService
               ) 

  { 
  	
    this.trip = JSON.parse(localStorage.getItem('tripdetail'));
  
  	this.trip$ = this.tripService.getTrip(this.trip.tripid).take(1)
    .subscribe(trip => {
          this.trip$ = trip;
          this.adulttotal = this.trip.adults * this.trip$.costadult;
          console.log(this.adulttotal);
          this.childtotal = this.trip.children * this.trip$.costchild;
          console.log(this.childtotal)
          this.grandtotal = this.adulttotal + this.childtotal;
          console.log(this.grandtotal);
          this.trip.adulttotal = this.adulttotal;
          this.trip.childtotal = this.childtotal;
          this.trip.grandtotal = this.grandtotal;

          if(!this.trip.uid)
            this.trip.uid = localStorage.getItem('uid'); //since anonymous users can view trips and land till the booking page. If anonymous uid will be null and can be updated here 
    });

    this.userService.get(localStorage.getItem('uid')).take(1).subscribe( user => {
      console.log('details', user.details);
      this.trip.bookerdetails = user.details;
    })

  }


 ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  book(paymentmode){
    //console.log(form.paymentmode)
  	this.trip.paymentmode = paymentmode;
    this.trip.datebooked = Date.now();
    this.trip.status = 'Pending confirmation';
    console.log('in book', this.trip);
    this.tripService.createBooking(this.trip).then(response => {
      console.log(response);
      //this.router.navigate(['/my/trips']);
    });

  }

  ngOnInit() {
  	
  }

}
