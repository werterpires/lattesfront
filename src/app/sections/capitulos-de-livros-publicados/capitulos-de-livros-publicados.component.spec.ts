import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CapitulosDeLivrosPublicadosComponent } from './capitulos-de-livros-publicados.component'

describe('TrablhosEmEventosComponent', () => {
  let component: CapitulosDeLivrosPublicadosComponent
  let fixture: ComponentFixture<CapitulosDeLivrosPublicadosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitulosDeLivrosPublicadosComponent]
    }).compileComponents()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fixture = TestBed.createComponent(CapitulosDeLivrosPublicadosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
