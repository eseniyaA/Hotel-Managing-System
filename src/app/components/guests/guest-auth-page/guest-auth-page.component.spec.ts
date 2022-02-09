import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAuthPageComponent } from './guest-auth-page.component';

describe('GuestAuthPageComponent', () => {
  let component: GuestAuthPageComponent;
  let fixture: ComponentFixture<GuestAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestAuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
