import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthPageComponent } from './admin-auth-page.component';

describe('AdminAuthPageComponent', () => {
  let component: AdminAuthPageComponent;
  let fixture: ComponentFixture<AdminAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
