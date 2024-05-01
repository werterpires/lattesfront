import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ParticipacoesEmEncontrosComponent } from './participacoes-em-encontros.component'

describe('OutrasParticipacoesEmEventosCongressosComponent', () => {
  let component: ParticipacoesEmEncontrosComponent
  let fixture: ComponentFixture<ParticipacoesEmEncontrosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipacoesEmEncontrosComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ParticipacoesEmEncontrosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
