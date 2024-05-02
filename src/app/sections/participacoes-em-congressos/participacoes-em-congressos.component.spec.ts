import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ParticipacoesEmCongressosComponent } from './participacoes-em-congressos.component'

describe('OutrasParticipacoesEmEventosCongressosComponent', () => {
  let component: ParticipacoesEmCongressosComponent
  let fixture: ComponentFixture<ParticipacoesEmCongressosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipacoesEmCongressosComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ParticipacoesEmCongressosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
