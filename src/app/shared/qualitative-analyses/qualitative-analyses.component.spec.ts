import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitativeAnalysesComponent } from './qualitative-analyses.component';

describe('QualitativeAnalysesComponent', () => {
  let component: QualitativeAnalysesComponent;
  let fixture: ComponentFixture<QualitativeAnalysesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualitativeAnalysesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualitativeAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
