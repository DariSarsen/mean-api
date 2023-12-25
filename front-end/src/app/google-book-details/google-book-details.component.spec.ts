import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleBookDetailsComponent } from './google-book-details.component';

describe('GoogleBookDetailsComponent', () => {
  let component: GoogleBookDetailsComponent;
  let fixture: ComponentFixture<GoogleBookDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleBookDetailsComponent]
    });
    fixture = TestBed.createComponent(GoogleBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
