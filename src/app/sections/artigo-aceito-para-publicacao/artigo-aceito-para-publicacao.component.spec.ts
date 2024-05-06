import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApresentacoesDeTrabalhoComponent } from './apresentacao-de-trabalho.component'

describe('TrablhosEmEventosComponent', () => {
  let component: ApresentacoesDeTrabalhoComponent
  let fixture: ComponentFixture<ApresentacoesDeTrabalhoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApresentacoesDeTrabalhoComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ApresentacoesDeTrabalhoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
