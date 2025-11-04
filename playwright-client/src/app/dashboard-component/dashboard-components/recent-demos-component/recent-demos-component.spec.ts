import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDemosComponent } from './recent-demos-component';

describe('RecentDemosComponent', () => {
  let component: RecentDemosComponent;
  let fixture: ComponentFixture<RecentDemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentDemosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
