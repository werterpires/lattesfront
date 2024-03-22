import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeProfessorsComponent } from './quantitative-professors.component';

describe('QuantitativeProfessorsComponent', () => {
  let component: QuantitativeProfessorsComponent;
  let fixture: ComponentFixture<QuantitativeProfessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeProfessorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantitativeProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
