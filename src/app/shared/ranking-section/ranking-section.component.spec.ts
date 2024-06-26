import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingSectionComponent } from './ranking-section.component';

describe('RankingSectionComponent', () => {
  let component: RankingSectionComponent;
  let fixture: ComponentFixture<RankingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
