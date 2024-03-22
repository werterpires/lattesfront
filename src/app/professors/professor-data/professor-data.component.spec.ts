import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDataComponent } from './professor-data.component';

describe('ProfessorDataComponent', () => {
  let component: ProfessorDataComponent;
  let fixture: ComponentFixture<ProfessorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
