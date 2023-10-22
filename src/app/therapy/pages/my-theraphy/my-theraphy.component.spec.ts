import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTheraphyComponent } from './my-theraphy.component';

describe('MyTheraphyComponent', () => {
  let component: MyTheraphyComponent;
  let fixture: ComponentFixture<MyTheraphyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTheraphyComponent]
    });
    fixture = TestBed.createComponent(MyTheraphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
