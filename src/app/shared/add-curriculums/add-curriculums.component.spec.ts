import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurriculumsComponent } from './add-curriculums.component';

describe('AddCurriculumsComponent', () => {
  let component: AddCurriculumsComponent;
  let fixture: ComponentFixture<AddCurriculumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCurriculumsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCurriculumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
