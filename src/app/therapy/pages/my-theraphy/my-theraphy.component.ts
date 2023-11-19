import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {PhysiotherapistService} from "../../../security/services/physiotherapist.service";
import {Router} from "@angular/router";
import {TherapyService} from "../../services/therapy.service";
import {Therapy} from "../../model/therapy";
import {Observable} from "rxjs";
import {Treatment} from "../../model/treatment";
import {TreatmentService} from "../../services/treatment.service";
import {DatePipe} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AppointmentService} from "../../services/appointment.service";
import {Appointment} from "../../model/appointment";
import {DiagnosisDialogComponent} from "../../../shared/components/diagnosis-dialog/diagnosis-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-theraphy',
  templateUrl: './my-theraphy.component.html',
  styleUrls: ['./my-theraphy.component.css']
})
export class MyTheraphyComponent {
  @ViewChild('myVideo') myVideo!: ElementRef;

  days!: string[];
  currentIndex: number = 0;
  maxVisibleDays: number = 10; // Define el número máximo de días visibles

  videoUrl!: SafeResourceUrl;
  videoName: string = 'knee flexion';
  videoDescription: string = 'Discover a comprehensive approach to boost knee flexion through a series of targeted therapeutic exercises and cutting-edge methods. Regain mobility and reduce discomfort with this effective rehabilitation program for healthier knees.';

  //EN ESTE DIA TE ENCUENTRAS
  daySelectedByUser: number = 0;

  indexInitial: number = 0;

  showMessageAppointment: boolean = true;

  selectedDayIndex: number = 0; // Inicializa el día seleccionado como el primer día


  currentDate!: Date;
  initialDate!: Date;

  noTherapy: boolean = false;
  currentTherapy!: Therapy;

  treatment!: Treatment;
  appointment!: Appointment;

  isTreatment: boolean = false;
  isAppointment: boolean = false;
  isGreater: boolean = false;

  toDo: boolean = true;
  inProcess: boolean = false;
  Done: boolean = true;

  constructor(private therapyService: TherapyService, private treatmentService: TreatmentService,
              private appointmentService: AppointmentService,private sanitizer: DomSanitizer ,
              private router: Router, private dialog: MatDialog) {
  }

  // Otras funciones de tu componente

  selectDay(index: number) {
    console.log(this.initialDate);
    console.log(this.currentDate);
    this.selectedDayIndex = index;
    //this.currentDate.setDate(this.initialDate.getDate() + (- this.daySelectedByUser + this.indexInitial + index))
    this.daySelectedByUser = this.indexInitial + index;


    const newDate = new Date(this.initialDate);

    // Suma la cantidad de días a la copia de la fecha
    newDate.setDate(newDate.getDate() + this.daySelectedByUser);

    // Establece la fecha actual en la copia actualizada
    this.currentDate = newDate;
    //this.currentDate.setDate(this.initialDate.getDate() +  this.daySelectedByUser);

    console.log(this.initialDate);
    console.log(this.currentDate);
    console.log(this.daySelectedByUser);

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1; // Meses en JavaScript se cuentan desde 0
    const day = this.currentDate.getDate();

    // Asegurarse de que el mes y el día tengan dos dígitos
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    console.log(formattedDate);
    //leer treatment
    if (formattedDate != null) {
      this.treatmentService.getTreatmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
          (value) => {
            this.treatment = value;
            this.isTreatment = true;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.treatment.videoUrl);
            if (this.myVideo && this.myVideo.nativeElement) {
              this.myVideo.nativeElement.load(); // Recarga el video
            }
          },
          (error) => {
            console.error('Error al obtener el tratamiento:', error);
            this.isTreatment = false;
          }
      );

        if(!this.isTreatment){
            this.appointmentService.getAppointmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
                (value) => {
                    this.appointment = value;
                    this.isAppointment = true;
                    this.Done = this.appointment.done;

                  this.inProcess = this.isCurrentTimeGreaterThan(this.appointment.hour, this.appointment.date) || this.Done;

                },
                (error) => {
                    console.error('Error al obtener la cita:', error);
                    this.isAppointment = false;
                }
            );
        }
    }

  }


  prevDay() {
    console.log(this.initialDate);
    console.log(this.currentDate);
    this.currentIndex = (this.currentIndex - 1 + this.days.length) % this.days.length;
    this.indexInitial -= 1;
    this.daySelectedByUser -=1;
    this.currentDate.setDate(this.currentDate.getDate() - 1)

    console.log(this.initialDate);
    console.log(this.currentDate);
    console.log(this.daySelectedByUser);


    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1; // Meses en JavaScript se cuentan desde 0
    const day = this.currentDate.getDate();

    // Asegurarse de que el mes y el día tengan dos dígitos
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    console.log(formattedDate);
    //leer treatment
    if (formattedDate != null) {
      this.treatmentService.getTreatmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
          (value) => {
            this.treatment = value;
            this.isTreatment = true;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.treatment.videoUrl);
            if (this.myVideo && this.myVideo.nativeElement) {
              this.myVideo.nativeElement.load(); // Recarga el video
            }
          },
          (error) => {
            console.error('Error al obtener el tratamiento:', error);
            this.isTreatment = false;
          }
      );
        if(!this.isTreatment){
            this.appointmentService.getAppointmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
                (value) => {
                    this.appointment = value;
                    this.isAppointment = true;
                    this.Done = this.appointment.done;

                  this.inProcess = this.isCurrentTimeGreaterThan(this.appointment.hour, this.appointment.date) || this.Done;

                },
                (error) => {
                    console.error('Error al obtener la cita:', error);
                    this.isAppointment = false;
                }
            );
        }
    }

  }

  nextDay() {
    console.log(this.initialDate);
    console.log(this.currentDate);
    this.currentIndex = (this.currentIndex + 1) % this.days.length;
    this.indexInitial += 1;
    this.daySelectedByUser +=1;
    this.currentDate.setDate(this.currentDate.getDate() + 1)
    console.log(this.initialDate);
    console.log(this.currentDate);
    console.log(this.daySelectedByUser);


    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1; // Meses en JavaScript se cuentan desde 0
    const day = this.currentDate.getDate();

    // Asegurarse de que el mes y el día tengan dos dígitos
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    console.log(formattedDate);
    //leer treatment
    if (formattedDate != null) {
      this.treatmentService.getTreatmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
          (value) => {
            this.treatment = value;
            this.isTreatment = true;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.treatment.videoUrl);
            if (this.myVideo && this.myVideo.nativeElement) {
              this.myVideo.nativeElement.load(); // Recarga el video
            }
          },
      (error) => {
        console.error('Error al obtener el tratamiento:', error);
        this.isTreatment = false;
      }
      );

        if(!this.isTreatment){
            this.appointmentService.getAppointmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
                (value) => {
                    this.appointment = value;
                    this.isAppointment = true;
                    this.Done = this.appointment.done;

                  this.inProcess = this.isCurrentTimeGreaterThan(this.appointment.hour, this.appointment.date) || this.Done;

                },
                (error) => {
                    console.error('Error al obtener la cita:', error);
                    this.isAppointment = false;
                }
            );
        }
    }

  }

  moveCarousel(step: number) {
    this.currentIndex += step;
  }

  get visibleDays() {
    // Calcula los días visibles en función del índice actual y el máximo de días visibles
    return this.days.slice(this.currentIndex, this.currentIndex + this.maxVisibleDays);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Detecta el ancho de la pantalla y ajusta el número máximo de días visibles
    if (window.innerWidth <= 800) {
      this.maxVisibleDays = 3; // Cambia a 1 día visible en pantallas pequeñas
    } else if (window.innerWidth <= 1200) {
      this.maxVisibleDays = 6; // Cambia a 1 día visible en pantallas pequeñas
    } else {
      this.maxVisibleDays = 10; // Cambia de nuevo a 10 días visibles en pantallas más grandes
    }
      if (window.innerWidth <= 1300) {
        this.showMessageAppointment = false;
      } else {
          this.showMessageAppointment = true;
      }

  }

  ngOnInit() {
    // Llama a la función de ajuste inicial para configurar el valor inicial
    this.onResize(null);
    //this.currentTherapy$ = this.therapyService.getActiveTherapyByPatientId();

    // this.currentTherapy$.subscribe( (therapy) =>
    //   console.log(therapy.therapyName)
    // )

    console.log("awafasdf");
    //
      this.therapyService.getActiveTherapyByPatientId().subscribe(
        (value) => {

          if (value == null) {
            this.noTherapy = true
          } else {
            this.currentTherapy = value;
            this.noTherapy = false;
            this.isGreater = this.isCurrentDateGreaterThan(value.finishAt);

            this.initialDate = new Date(this.currentTherapy.startAt);
            this.currentDate = new Date(this.currentTherapy.startAt); // Inicializa la propiedad con la fecha actual

            this.initialDate.setDate(this.initialDate.getDate() + 1);
            this.currentDate.setDate(this.currentDate.getDate() + 1);

            console.log(this.initialDate);
            console.log(this.currentDate);


            let initialDate = new Date(this.currentTherapy.startAt);
            let finishDate = new Date(this.currentTherapy.finishAt);

            let timeDifference = finishDate.getTime() - initialDate.getTime();

            let daysDifference = timeDifference / (1000 * 3600 * 24) + 1;

            console.log("La diferencia en días es: " + daysDifference);

            this.days = Array.from({length: daysDifference}, (_, i) => `DAY ${i + 1}`)


            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth() + 1; // Meses en JavaScript se cuentan desde 0
            const day = this.currentDate.getDate();

            // Asegurarse de que el mes y el día tengan dos dígitos
            const formattedMonth = month < 10 ? `0${month}` : `${month}`;
            const formattedDay = day < 10 ? `0${day}` : `${day}`;

            const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
            console.log(formattedDate);
            //leer treatment
            if (formattedDate != null) {
              this.treatmentService.getTreatmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
                (value) => {
                  this.treatment = value;
                  this.isTreatment = true;
                  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.treatment.videoUrl);
                  if (this.myVideo && this.myVideo.nativeElement) {
                    this.myVideo.nativeElement.load(); // Recarga el video
                  }
                  },
                (error) => {
                  console.error('Error al obtener el tratamiento:', error);
                  this.isTreatment = false;
                }
              );

              if (!this.isTreatment) {
                this.appointmentService.getAppointmentByDateAndTherapyId(this.currentTherapy.id, formattedDate).subscribe(
                  (value) => {
                    this.appointment = value;
                    this.isAppointment = true;
                    this.Done = this.appointment.done;

                    this.inProcess = this.isCurrentTimeGreaterThan(this.appointment.hour, this.appointment.date) || this.Done;

                  },
                  (error) => {
                    console.error('Error al obtener la cita:', error);
                    this.isAppointment = false;
                  }
                );
              }

            }


          }
        },
        (error) => {
          // Hubo un error al buscar la terapia.
          console.error("Error al buscar la terapia:", error);
          this.noTherapy = true;
        }
      );
  }

  isCurrentTimeGreaterThan(targetTime: string, targetDate: string): boolean {
    const currentTime = new Date();
    const [targetHour, targetMinute] = targetTime.split(':').map(Number);

    console.log("aqui" + targetHour)

    if (
      currentTime.getHours() >= targetHour && this.isCurrentDateGreaterThan(targetDate)
    )
     {
       console.log("aqui" + currentTime.getHours())

       return true;
    }

    return false;
  }

  isCurrentDateGreaterThan(targetDate: string): boolean {
    const currentDate = new Date();
    const [targetYear, targetMonth, targetDay] = targetDate.split('-').map(Number);

    if (
      currentDate.getFullYear() > targetYear ||
      (currentDate.getFullYear() === targetYear &&
        (currentDate.getMonth() > targetMonth - 1 ||
          (currentDate.getMonth() === targetMonth - 1 && currentDate.getDate() >= targetDay)))
    ) {
      return true;
    }

    return false;
  }

  openDiagnosisDialog() {
    this.dialog.open(DiagnosisDialogComponent, {
      data: {
        topic: this.appointment.topic,
        date: this.appointment.date,
        hour: this.appointment.hour,
        physiotherapist_full_name: this.currentTherapy.physiotherapist.user.firstname+ " "+this.currentTherapy.physiotherapist.user.lastname,
        diagnosis: this.appointment.diagnosis,
      },
    });
  }

}
