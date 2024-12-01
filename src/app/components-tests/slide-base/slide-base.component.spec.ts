import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBaseComponent } from './slide-base.component';

describe('SlideBaseComponent', () => {
  let component: SlideBaseComponent;
  let fixture: ComponentFixture<SlideBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
