import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuantitativeOthersEventsComponent } from './quantitative-outras-participacoes-em-eventos-congressos.component'

describe('QualitativeEventsWorksComponent', () => {
  let component: QuantitativeOthersEventsComponent
  let fixture: ComponentFixture<QuantitativeOthersEventsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeOthersEventsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(QuantitativeOthersEventsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
