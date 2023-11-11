import { Component, OnInit } from '@angular/core';
import {Observable, take} from "rxjs";
import {Patient} from "../../../security/model/patient";
import {PatientService} from "../../../security/services/patient.service";
import {Consultation} from "../../../consultations/model/Consultation";
import {ConsultationService} from "../../../consultations/services/consultation.service";
import {Diagnosis} from "../../model/diagnosis";
import {DiagnosisService} from "../../services/diagnosis.service";
import {Review} from "../../../social/model/review";
import {Appointment} from "../../../therapy/model/appointment";
import {AppointmentService} from "../../../therapy/services/appointment.service";
import {Therapy} from "../../../therapy/model/therapy";
import {TreatmentService} from "../../../therapy/services/treatment.service";
import {Treatment} from "../../../therapy/model/treatment";
import {Physiotherapist} from "../../../security/model/physiotherapist";
import {TherapyService} from "../../../therapy/services/therapy.service";
import {ActivatedRoute, Router} from "@angular/router";


  @Component({
    selector: 'app-home-patient',
    templateUrl: './home-patient.component.html',
    styleUrls: ['./home-patient.component.css']
  })
  export class HomePatientComponent implements OnInit {

    patientLoggedId: number = 0
    patient$: Observable<Patient> | undefined
    consultations: Consultation[]=[];
    lastConsultation!: Consultation | undefined
    lastDiagnosis$: Observable<Diagnosis> | undefined
    appointments: Appointment[]=[];
    firstThreeAppointments$: Appointment []=[]

    treatments: Treatment[]=[];
    valueProgress: string = "";
    numberOfTreatments: number = 0;
    treatmentsViewed: number = 0;
    therapyActiveId: number = 0
    therapy$: Observable<Therapy> | undefined




   /* physiotherapists: Physiotherapist[]=[];
    treatments: Treatment[]=[];
    myTreatments: TreatmentsByPatient[]=[];
    appointments: Appointments[]=[];
    currentUser: number;
  */
    constructor(private route: ActivatedRoute, private navigator:Router, private patientService: PatientService, private consultationService: ConsultationService, private diagnosisService: DiagnosisService, private appointmentService: AppointmentService, private treatmentService: TreatmentService, private therapyService: TherapyService) {

    }

    ngOnInit(): void {
      this.patient$= this.patientService.getPatientLogged();
      this.therapy$ = this.therapyService.getActiveTherapyByPatientId();



      this.patientService.getPatientLogged().subscribe((response: any)=>{

        this.patientLoggedId=response.id
        console.log(this.patientLoggedId)
        this.getFirstThreeAppointments(this.patientLoggedId)

        this.getLastConsultation(this.patientLoggedId)

      })

      this.therapyService.getActiveTherapyByPatientId().subscribe((response:any)=>{
        this.therapyActiveId = response.id;
        console.log('valor de therapyID', this.therapyActiveId)
        this.getAllTreatments(this.therapyActiveId);
      })

      this.lastDiagnosis$ = this.diagnosisService.getLastDiagnosis();




      /*this.route.params.pipe( take(1)).subscribe((params) => {
        const id = params['id'];
        this.therapy$! = this.therapyService.getTheraphByPatientId();console.log('El valor de percentaje es:', this.therapy$);

        this.treatmentService.getAllTreatmentsByTherapyId(id).subscribe((response:any)=>{
          this.treatments=response.content;
          this.numberOfTreatments = this.treatments.length
        })


      });*/





    }

    getLastConsultation(patientId: number){
      this.consultationService.getByPatientId(patientId).subscribe((response: any) => {
        this.consultations = response.content;

        if(this.consultations.length > 0) {
          this.lastConsultation = this.consultations.filter(consultation => consultation.done === false).pop();
        }
      })
    }

    getFirstThreeAppointments(patientId: number){
      this.appointmentService.getUpcomingAppointments(patientId).subscribe((response:any)=>{
        this.appointments = response.content;

        /*if(this.appointments.length > 0) {
          this.firstThreeAppointments$ = this.appointments.splice(0,3);
          // this.firstAppointment = this.appointments.pop();
        }*/
        this.firstThreeAppointments$ = this.appointments
          .filter(appointment => !appointment.done)
          .slice(0, 3);


      })
    }

    getAllTreatments(therapyId: number){
      this.treatmentService.getAllTreatmentsByTherapyId(therapyId).subscribe((response:any)=> {
        this.treatments = response.content;
        this.numberOfTreatments = this.treatments.length;

        this.treatmentsViewed = this.treatments.filter(treatment => treatment.viewed === true).length;

        this.valueProgress = ((this.treatmentsViewed/this.numberOfTreatments)*100).toFixed(1);

      })
    }


    /*getLastDiagnosis(patientId: number){
      this.consultationService.getByPatientId(patientId).subscribe((response: any) => {
        this.diagnosis = response.content;

        if(this.diagnosis.length > 0) {
          this.lastDiagnosis = this.diagnosis.pop();
        }
      })
    }*/


  /*
    getAllPhysiotherapists(){
      this.physiotherapistsService.getAll().subscribe((response: any) =>{
        this.physiotherapists = response.content;
      })
    }

    getAllTreatments(){
      this.treatmentsService.getAll().subscribe((response:any)=>{
        this.treatments = response.content;
      })
    }

    getAllMyTreatments(){
      this.myTreatmentsService.getAll().subscribe((response: any)=>{
        this.myTreatments = response.content;
      })
    }*/
    protected readonly frameElement = frameElement;
  }
