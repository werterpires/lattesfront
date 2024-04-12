import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuantitativeEventsWorksComponent } from './quantitative-events-works.component'

describe('QualitativeEventsWorksComponent', () => {
  let component: QuantitativeEventsWorksComponent
  let fixture: ComponentFixture<QuantitativeEventsWorksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeEventsWorksComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(QuantitativeEventsWorksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
