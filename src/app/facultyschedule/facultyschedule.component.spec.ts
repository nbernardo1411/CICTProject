import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyscheduleComponent } from './facultyschedule.component';

describe('FacultyscheduleComponent', () => {
  let component: FacultyscheduleComponent;
  let fixture: ComponentFixture<FacultyscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyscheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
