import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonText, IonButton, IonLabel, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonText, IonButton, IonLabel, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController

  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    if (email === 'admin@gmail.com' && password === '123456') {
      await this.router.navigateByUrl('/add-patient');
    } else {
      const toast = await this.toastController.create({
        message: 'Invalid email or password.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}