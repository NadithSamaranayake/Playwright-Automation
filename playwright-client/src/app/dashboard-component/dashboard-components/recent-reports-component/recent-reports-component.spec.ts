import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentReportsComponent } from './recent-reports-component';

describe('RecentReportsComponent', () => {
  let component: RecentReportsComponent;
  let fixture: ComponentFixture<RecentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
