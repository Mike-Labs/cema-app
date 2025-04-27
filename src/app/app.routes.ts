import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'add-patient',
    loadComponent: () => import('./pages/add-patient/add-patient.page').then( m => m.AddPatientPage),
    canActivate: [authGuard],
  },
  {
    path: 'all-patients',
    loadComponent: () => import('./pages/all-patients/all-patients.page').then( m => m.AllPatientsPage),
    canActivate: [authGuard],
  },
  {
    path: 'patient-details/:id',
    loadComponent: () => import('./pages/patient-details/patient-details.page').then( m => m.PatientDetailsPage),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
