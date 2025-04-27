import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonCardSubtitle, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { PatientService } from 'src/app/services/patient.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.page.html',
  styleUrls: ['./all-patients.page.scss'],
  standalone: true,
  imports: [IonContent, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonCardSubtitle, IonButtons, IonBackButton, IonIcon, CommonModule, FormsModule]
})
export class AllPatientsPage implements OnInit {

  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm: string = '';

  constructor(private patientService: PatientService, private toastController: ToastController) { }

  ngOnInit() {
    this.fetchPatients();
  }


  async fetchPatients() {
    const loadingToast = await this.toastController.create({
      message: 'Loading patients...',
      duration: 0, // Will stay until manually dismissed
      position: 'bottom',
      cssClass: 'custom-toast', // Optional if you want to customize
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          side: 'end', // places it on the right
          handler: () => {
            console.log('Toast dismissed');
          }
        }
      ]
    });

    await loadingToast.present();

    this.patientService.getPatients().subscribe({
      next: (data) => {
        console.log('Patients fetched', data);
        this.patients = data;
        this.filteredPatients = this.patients;
        loadingToast.dismiss(); // Dismiss toast when done
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
        loadingToast.message = 'Error loading patients';
        setTimeout(() => {
          loadingToast.dismiss();
        }, 2000); // Dismiss after 2 seconds if error
      }
    });
  }

  filterPatients() {
    const search = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(search) ||
      patient.illness.toLowerCase().includes(search)
    );
  }

}
