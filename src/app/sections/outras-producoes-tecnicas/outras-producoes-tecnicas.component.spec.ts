import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OutrasProducoesTecnicasComponent } from './outras-producoes-tecnicas.component'

describe('TrablhosEmEventosComponent', () => {
  let component: OutrasProducoesTecnicasComponent
  let fixture: ComponentFixture<OutrasProducoesTecnicasComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrasProducoesTecnicasComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(OutrasProducoesTecnicasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
