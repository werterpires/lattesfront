import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent } from './curso-de-curta-duracao-ministrado.component'

describe('TrablhosEmEventosComponent', () => {
  let component: DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent
  let fixture: ComponentFixture<DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(
      DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
