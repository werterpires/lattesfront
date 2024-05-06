import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OutrasProducoesBibliograficasComponent } from './outras-producoes-bibliograficas.component'

describe('TrablhosEmEventosComponent', () => {
  let component: OutrasProducoesBibliograficasComponent
  let fixture: ComponentFixture<OutrasProducoesBibliograficasComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrasProducoesBibliograficasComponent]
    }).compileComponents()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fixture = TestBed.createComponent(OutrasProducoesBibliograficasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
