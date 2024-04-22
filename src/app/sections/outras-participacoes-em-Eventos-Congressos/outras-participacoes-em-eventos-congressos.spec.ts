import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OutrasParticipacoesEmEventosCongressosComponent } from './outras-participacoes-em-eventos-congressos.component'

describe('OutrasParticipacoesEmEventosCongressosComponent', () => {
  let component: OutrasParticipacoesEmEventosCongressosComponent
  let fixture: ComponentFixture<OutrasParticipacoesEmEventosCongressosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrasParticipacoesEmEventosCongressosComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(
      OutrasParticipacoesEmEventosCongressosComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
