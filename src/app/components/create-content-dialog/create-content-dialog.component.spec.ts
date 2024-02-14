import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentDialogComponent } from './create-content-dialog.component';

describe('CreateContentDialogComponent', () => {
  let component: CreateContentDialogComponent;
  let fixture: ComponentFixture<CreateContentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateContentDialogComponent]
    });
    fixture = TestBed.createComponent(CreateContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
