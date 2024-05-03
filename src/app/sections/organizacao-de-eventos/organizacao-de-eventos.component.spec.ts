import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganizacoesDeEventosComponent } from './organizacao-de-eventos.component'

describe('TrablhosEmEventosComponent', () => {
  let component: OrganizacoesDeEventosComponent
  let fixture: ComponentFixture<OrganizacoesDeEventosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizacoesDeEventosComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(OrganizacoesDeEventosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
