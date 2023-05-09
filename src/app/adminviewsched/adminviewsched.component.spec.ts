import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewschedComponent } from './adminviewsched.component';

describe('AdminviewschedComponent', () => {
  let component: AdminviewschedComponent;
  let fixture: ComponentFixture<AdminviewschedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewschedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminviewschedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
