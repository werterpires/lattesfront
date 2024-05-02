import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ParticipacoesEmSeminariosComponent } from './participacoes-em-seminarios.component'

describe('OutrasParticipacoesEmEventosCongressosComponent', () => {
  let component: ParticipacoesEmSeminariosComponent
  let fixture: ComponentFixture<ParticipacoesEmSeminariosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipacoesEmSeminariosComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ParticipacoesEmSeminariosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
