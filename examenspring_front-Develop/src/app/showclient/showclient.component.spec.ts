import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowclientComponent } from './showclient.component';

describe('ShowclientComponent', () => {
  let component: ShowclientComponent;
  let fixture: ComponentFixture<ShowclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowclientComponent]
    });
    fixture = TestBed.createComponent(ShowclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
