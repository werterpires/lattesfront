import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextosEmJornaisOuRevistasComponent } from './textos-em-jornais-ou-revistas.component'

describe('TrablhosEmEventosComponent', () => {
  let component: TextosEmJornaisOuRevistasComponent
  let fixture: ComponentFixture<TextosEmJornaisOuRevistasComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextosEmJornaisOuRevistasComponent]
    }).compileComponents()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fixture = TestBed.createComponent(TextosEmJornaisOuRevistasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
