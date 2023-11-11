import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../security/services/patient.service";
import {Router} from "@angular/router";
import {CreateMedicalHistory} from "../../../health-record-expertise/model/medical-history/CreateMedicalHistory";
import {MedicalHistoryService} from "../../../health-record-expertise/services/medical-history.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.css']
})
export class MedicalHistoryFormComponent {
  medicalHistory:  CreateMedicalHistory = new CreateMedicalHistory(
    0,
    '',
    0,
    0,
    '',
    '',
    '',
    ''
  )

  constructor(
    private formBuilder: FormBuilder,
    private medicalHistoryService: MedicalHistoryService,
    private dialogRef: MatDialogRef<MedicalHistoryFormComponent>,
  ) {}

  submitMedicalHistoryForm() {
    this.medicalHistoryService.createMedicalHistory(this.medicalHistory).subscribe(
      (response: any) => {
        console.log('Historial médico creado exitosamente', response);
        this.dialogRef.close();
      },
      (error: any) => {
        console.error('Error al crear el historial médico', error);
      }
    );
  }

  registerForm: FormGroup = this.formBuilder.group({
    gender: ['', {validators: [Validators.required], updatedOn: 'change'}],
    size: ['', {validators: [Validators.required], updatedOn: 'change'}],
    weight: ['', {validators: [Validators.required], updatedOn: 'change'}],
    birthplace: ['', {validators: [Validators.required], updatedOn: 'change'}],
    hereditaryHistory: ['', {validators: [Validators.required], updatedOn: 'change'}],
    nonPathologicalHistory: ['', {validators: [Validators.required], updatedOn: 'change'}],
    pathologicalHistory: ['', {validators: [Validators.required], updatedOn: 'change'}]
  })
}
