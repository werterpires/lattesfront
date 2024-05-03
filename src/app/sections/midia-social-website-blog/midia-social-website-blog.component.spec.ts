import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MidiasSociaisWebsitesBlogsComponent } from './midia-social-website-blog.component'

describe('TrablhosEmEventosComponent', () => {
  let component: MidiasSociaisWebsitesBlogsComponent
  let fixture: ComponentFixture<MidiasSociaisWebsitesBlogsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidiasSociaisWebsitesBlogsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(MidiasSociaisWebsitesBlogsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
