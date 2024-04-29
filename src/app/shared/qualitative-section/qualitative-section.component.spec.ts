import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitativeSectionComponent } from './qualitative-section.component';

describe('QualitativeSectionComponent', () => {
  let component: QualitativeSectionComponent;
  let fixture: ComponentFixture<QualitativeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualitativeSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualitativeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
