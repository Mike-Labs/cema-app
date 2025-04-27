import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonRadioGroup, IonRadio, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,IonItem, IonLabel, IonInput, IonRadioGroup, IonRadio, IonFabButton, IonIcon ]
})
export class AddPatientPage implements OnInit {

  patientForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      image: [null],
      name: ['', Validators.required],
      age: ['', Validators.required],
      bloodPressure: ['', Validators.required],
      heartRate: ['', Validators.required],
      illness: ['malaria', Validators.required],
      careType: ['hospitalized', Validators.required]
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.patientForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.patientForm.valid) {
      console.log('Patient Data:', this.patientForm.value);
      const patientData = this.patientForm.value;

      if(this.imagePreview){
        patientData.image = this.imagePreview;
      }

      this.patientService.addPatient(patientData).subscribe({
        next: (response) => {
          console.log('Patient successfully added:', response);

          this.router.navigate(['/all-patients']);

          this.patientForm.reset();
        },
        error: (error) => {
          console.error('Error adding patient:', error);
        }
      });
      
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

}
