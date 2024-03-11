import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitativeEventsWorksComponent } from './qualitative-events-works.component';

describe('QualitativeEventsWorksComponent', () => {
  let component: QualitativeEventsWorksComponent;
  let fixture: ComponentFixture<QualitativeEventsWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualitativeEventsWorksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualitativeEventsWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
