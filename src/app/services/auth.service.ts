import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isLoggedIn(): boolean {
    const auth = getAuth();
    const user = auth.currentUser;
    return !!user;
  }
}
