import { AppUser } from './models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'; 

@Injectable()
export class UserService {
userid;
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.userid = user.uid;
    this.db.object('/tattlers/' + user.uid + '/details/').update({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    });
  }

  createTattler(tattler){
    //tattler.isAdmin = true;
    this.db.object('/tattlers/' + this.userid).update({
      isAdmin: true
    });
    return this.db.object('/tattlers/' + this.userid + '/details/').update(tattler); 
  }

  get(uid: string): FirebaseObjectObservable<AppUser> { 
    return this.db.object('/tattlers/' + uid);
  }

  getByEmail(email) {
    return this.db.list('/tattlers', {
      query: {
        orderByChild: 'details/email',
        equalTo: email
      }
    })
  }

  getMyBookings(){
    return this.db.list('/tattlers/' + localStorage.getItem('uid') + '/mybookings');
  }

  getLanguagesSpoken(){
    return this.db.list('/languagesspoken');
  }

  getCulturalExperiences(){
     return this.db.list('/culturalexperience');
  }
}
