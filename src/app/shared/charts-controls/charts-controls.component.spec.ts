import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartsControlsComponent } from './charts-controls.component'

describe('ChartsControlsComponent', () => {
  let component: ChartsControlsComponent
  let fixture: ComponentFixture<ChartsControlsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsControlsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ChartsControlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
