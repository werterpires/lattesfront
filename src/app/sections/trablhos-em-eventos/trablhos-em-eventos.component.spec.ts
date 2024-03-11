import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrablhosEmEventosComponent } from './trablhos-em-eventos.component';

describe('TrablhosEmEventosComponent', () => {
  let component: TrablhosEmEventosComponent;
  let fixture: ComponentFixture<TrablhosEmEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrablhosEmEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrablhosEmEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
