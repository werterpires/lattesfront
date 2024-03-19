import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeProfessorComponent } from './quantitative-professor.component';

describe('QuantitativeProfessorComponent', () => {
  let component: QuantitativeProfessorComponent;
  let fixture: ComponentFixture<QuantitativeProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantitativeProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
