import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyborrowComponent } from './keyborrow.component';

describe('KeyborrowComponent', () => {
  let component: KeyborrowComponent;
  let fixture: ComponentFixture<KeyborrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyborrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyborrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
