import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeEventsRowComponent } from './quantitative-events-row.component';

describe('QuantitativeEventsRowComponent', () => {
  let component: QuantitativeEventsRowComponent;
  let fixture: ComponentFixture<QuantitativeEventsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeEventsRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantitativeEventsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
