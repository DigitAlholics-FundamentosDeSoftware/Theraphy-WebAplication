import {Component, OnInit} from '@angular/core';
import {Review} from "../../model/review";
import {Physiotherapist} from "../../../security/model/physiotherapist";
import {Observable, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../services/review.service";
import {PhysiotherapistService} from "../../../security/services/physiotherapist.service";
import {PatientService} from "../../../security/services/patient.service";
import {CreateReview} from "../../model/createReview";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent  implements OnInit {

  newReview: CreateReview;
  physiotherapist$: Observable<Physiotherapist> | undefined
  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];

  constructor(private route: ActivatedRoute, private navigator:Router, private reviewService: ReviewService, private physiotherapistService: PhysiotherapistService, private patientService: PatientService) {
    this.newReview={} as CreateReview;

  }

  ngOnInit(): void {
    this.route.params.pipe( take(1)).subscribe((params) => {
      const id = params['id'];
      this.physiotherapist$ = this.physiotherapistService.getById(id);
        this.newReview.physiotherapistId=id;


    });

  }

  goBack() {
    window.history.back();
  }

  selectStar(value: any ): void{
    this.stars.filter( (star) => {

      if ( star.id <= value){

        star.class = 'star-gold star';

      }else{

        star.class = 'star-gray star';

      }

      return star;
    });


    this.selectedRating = value;

  }

  addReview(){

    this.newReview.id=0;

    this.newReview.score=this.selectedRating;

    this.reviewService.createReview(this.newReview).subscribe(
      () => {
        this.navigator.navigate(['/home-patient']);
      },
      (error) => {
        console.error('Error al crear reseña:', error);
      }
    );
  }
}
