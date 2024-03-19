import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsWorkRankingComponent } from './events-work-ranking.component';

describe('EventsWorkRankingComponent', () => {
  let component: EventsWorkRankingComponent;
  let fixture: ComponentFixture<EventsWorkRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsWorkRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsWorkRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
