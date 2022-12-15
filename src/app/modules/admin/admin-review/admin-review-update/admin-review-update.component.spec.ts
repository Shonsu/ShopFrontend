import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewUpdateComponent } from './admin-review-update.component';

describe('AdminReviewUpdateComponent', () => {
  let component: AdminReviewUpdateComponent;
  let fixture: ComponentFixture<AdminReviewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReviewUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReviewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
