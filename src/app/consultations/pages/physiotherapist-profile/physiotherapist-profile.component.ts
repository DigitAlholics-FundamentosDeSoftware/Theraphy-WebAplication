import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Physiotherapist} from "../../../security/model/physiotherapist";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../../social/services/review.service";
import {PhysiotherapistService} from "../../../security/services/physiotherapist.service";
import {PatientService} from "../../../security/services/patient.service";
import {CreateReview} from "../../../social/model/createReview";
import {Review} from "../../../social/model/review";
import {Job} from "../../../health-record-expertise/model/job";
import {JobService} from "../../../health-record-expertise/services/job.service";
import {CertificationService} from "../../../health-record-expertise/services/certification.service";
import {Certification} from "../../../health-record-expertise/model/certification";

@Component({
  selector: 'app-physiotherapist-profile',
  templateUrl: './physiotherapist-profile.component.html',
  styleUrls: ['./physiotherapist-profile.component.css']
})
export class PhysiotherapistProfileComponent implements OnInit {
  reviews$: Review []=[]
  jobs$: Job [] = []
  certifications$: Certification []= []
  reviewsQuantity: number
  physiotherapist$: Observable<Physiotherapist> | undefined
  currentUser: number;
  numberOfVisibleReviews: number = 3;
  showMore: boolean = false;
  ratingRounded: number=0;


  constructor(private route: ActivatedRoute, private navigator:Router, private physiotherapistService: PhysiotherapistService, private reviewService: ReviewService, private jobService: JobService, private certificationService: CertificationService) {
    this.currentUser = 1;
    this.reviewsQuantity=0

  }

  ngOnInit(): void {
    this.route.params.pipe( take(1)).subscribe((params) => {
      const id = params['id'];
      this.physiotherapist$ = this.physiotherapistService.getById(id);

      this.physiotherapistService.getById(id).subscribe((response:any)=>{
        this.ratingRounded = response.rating.toFixed(1);
      })

      this.reviewService.getByPhysiotherapistId(id).subscribe((response:any)=>{
        this.reviews$=response.content;
        this.reviewsQuantity = this.reviews$.length
      })

      this.jobService.getByPhysiotherapistId(id).subscribe((response:any)=>{
        this.jobs$=response.content;
      })

      this.certificationService.getByPhysiotherapistId(id).subscribe((response:any)=>{
        this.certifications$=response.content;
      })


    });

  }

  goBack() {
    window.history.back();
  }

  toggleShowMore() {
    if(!this.showMore){
      this.numberOfVisibleReviews = this.reviews$.length;
      this.showMore=true
    }else{
      this.numberOfVisibleReviews= 3;
        this.showMore=false;
    }

  }


}
