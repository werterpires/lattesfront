import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LivrosPublicadosOuOrganizadosComponent } from './livros-publicados-ou-organizados.component'

describe('TrablhosEmEventosComponent', () => {
  let component: LivrosPublicadosOuOrganizadosComponent
  let fixture: ComponentFixture<LivrosPublicadosOuOrganizadosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosPublicadosOuOrganizadosComponent]
    }).compileComponents()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fixture = TestBed.createComponent(LivrosPublicadosOuOrganizadosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
