import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeSectionComponent } from './quantitative-section.component';

describe('QuantitativeSectionComponent', () => {
  let component: QuantitativeSectionComponent;
  let fixture: ComponentFixture<QuantitativeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantitativeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
