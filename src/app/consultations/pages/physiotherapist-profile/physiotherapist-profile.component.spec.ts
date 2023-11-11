import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistProfileComponent } from './physiotherapist-profile.component';

describe('PhysiotherapistProfileComponent', () => {
  let component: PhysiotherapistProfileComponent;
  let fixture: ComponentFixture<PhysiotherapistProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysiotherapistProfileComponent]
    });
    fixture = TestBed.createComponent(PhysiotherapistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
