import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistListComponent } from './physiotherapist-list.component';

describe('PhysiotherapistListComponent', () => {
  let component: PhysiotherapistListComponent;
  let fixture: ComponentFixture<PhysiotherapistListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysiotherapistListComponent]

    });
    fixture = TestBed.createComponent(PhysiotherapistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
