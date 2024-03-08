import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LattesSectionComponent } from './lattes-section.component';

describe('LattesSectionComponent', () => {
  let component: LattesSectionComponent;
  let fixture: ComponentFixture<LattesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LattesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LattesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
