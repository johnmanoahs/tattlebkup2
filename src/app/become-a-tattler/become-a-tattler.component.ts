import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../user.service'; 
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-become-a-tattler',
  templateUrl: './become-a-tattler.component.html',
  styleUrls: ['./become-a-tattler.component.css']
})
export class BecomeATattlerComponent implements OnInit {
	languagesspoken$;
	culturalexperience$;
	isAdmin;//: boolean;
	user$;
  constructor(
  				private userService: UserService,
  				private router: Router
  			) {
  	this.languagesspoken$ = this.userService.getLanguagesSpoken();
  	this.culturalexperience$ = this.userService.getCulturalExperiences();
  	this.userService.get(localStorage.getItem('uid')).take(1).subscribe(user => {
  		this.isAdmin = user.isAdmin;
  		this.user$ = user;
  		console.log('isadmin', this.user$)
  	})
  	
  }

  ngOnInit() {
  }

  createTattler(tattler){
  	console.log(tattler);
  	this.userService.createTattler(tattler).then(response => {
  		this.router.navigate(['/profile', localStorage.getItem('uid')]);
  	});
  }

}
