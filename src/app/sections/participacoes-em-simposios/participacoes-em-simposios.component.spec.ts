import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ParticipacoesEmSimposiosComponent } from './participacoes-em-simposios.component'

describe('OutrasParticipacoesEmEventosCongressosComponent', () => {
  let component: ParticipacoesEmSimposiosComponent
  let fixture: ComponentFixture<ParticipacoesEmSimposiosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipacoesEmSimposiosComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ParticipacoesEmSimposiosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
