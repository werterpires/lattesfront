import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProgramasDeRadioOuTVComponent } from './programa-de-radio-ou-tv.component'

describe('TrablhosEmEventosComponent', () => {
  let component: ProgramasDeRadioOuTVComponent
  let fixture: ComponentFixture<ProgramasDeRadioOuTVComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasDeRadioOuTVComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ProgramasDeRadioOuTVComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
