import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryFormComponent } from './medical-history-form.component';

describe('MedicalHistoryFormComponent', () => {
  let component: MedicalHistoryFormComponent;
  let fixture: ComponentFixture<MedicalHistoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalHistoryFormComponent]
    });
    fixture = TestBed.createComponent(MedicalHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
