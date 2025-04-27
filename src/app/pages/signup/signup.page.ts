import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonText, ToastController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel, IonInput, IonText, ReactiveFormsModule]
})
export class SignupPage implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signupForm.value;

    try {
      await this.authService.signup(email, password);
      console.log('Signup successful');

      const toast = await this.toastController.create({
        message: 'Signup successful! Please log in.',
        duration: 2000,
        color: 'success',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ]
      });
      await toast.present();

      this.router.navigate(['/login']); // Redirect to login page
    } catch (error) {
      console.error('Signup error', error);

      const toast = await this.toastController.create({
        message: 'Signup failed. Please try again.',
        duration: 2000,
        color: 'danger',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
    }
  }

}
