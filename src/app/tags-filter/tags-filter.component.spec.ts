import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsFilterComponent } from './tags-filter.component';

describe('TagsFilterComponent', () => {
  let component: TagsFilterComponent;
  let fixture: ComponentFixture<TagsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
