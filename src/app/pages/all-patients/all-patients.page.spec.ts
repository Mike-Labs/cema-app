import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllPatientsPage } from './all-patients.page';

describe('AllPatientsPage', () => {
  let component: AllPatientsPage;
  let fixture: ComponentFixture<AllPatientsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
