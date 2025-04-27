import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://680c5df82ea307e081d3ce0e.mockapi.io/api/v1/messages/patients';

  constructor(private http: HttpClient) { }

  addPatient(patientData: any): Observable<any>{
    return this.http.post(this.apiUrl, patientData);
  }

  getPatients(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
