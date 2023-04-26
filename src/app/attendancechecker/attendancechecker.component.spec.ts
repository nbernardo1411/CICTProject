import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancecheckerComponent } from './attendancechecker.component';

describe('AttendancecheckerComponent', () => {
  let component: AttendancecheckerComponent;
  let fixture: ComponentFixture<AttendancecheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancecheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancecheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
