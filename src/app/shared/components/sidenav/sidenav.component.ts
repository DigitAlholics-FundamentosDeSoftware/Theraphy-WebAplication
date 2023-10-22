import {Component, HostListener, OnInit} from '@angular/core';
import {sidenavMenuData} from "./sidenavMenuData";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PatientService} from "../../../security/services/patient.service";
import {Observable} from "rxjs";
import {Patient} from "../../../security/model/patient";
import {MatDialog} from "@angular/material/dialog";
import {LogOutDialogComponent} from "../log-out-dialog/log-out-dialog.component";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  sidenavData = sidenavMenuData;
  isExpanded = true;
  patient$: Observable<Patient> | undefined

  constructor(private http: HttpClient,private patientService:PatientService,private dialog: MatDialog) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }
  ngOnInit(): void {

    this.patient$= this.patientService.getPatientLogged();

    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    this.isExpanded = window.innerWidth > 1800; // Cambia isExpanded a false si el ancho es menor o igual a 800px
  }
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('consultationData')
  }

  openLogoutConfirmationDialog() {
    const dialogRef = this.dialog.open(LogOutDialogComponent, {
      width: '20vw', // Puedes ajustar el tamaño según tus necesidades
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'logout') {
        this.logout(); // Llama a tu función de logout
      }
    });
  }

}
