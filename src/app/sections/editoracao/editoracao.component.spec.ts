import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditoracoesComponent } from './editoracao.component'

describe('TrablhosEmEventosComponent', () => {
  let component: EditoracoesComponent
  let fixture: ComponentFixture<EditoracoesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditoracoesComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(EditoracoesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
