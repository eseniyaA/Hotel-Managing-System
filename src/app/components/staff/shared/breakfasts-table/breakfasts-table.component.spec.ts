import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastsTableComponent } from './breakfasts-table.component';

describe('BreakfastsTableComponent', () => {
  let component: BreakfastsTableComponent;
  let fixture: ComponentFixture<BreakfastsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakfastsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakfastsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
