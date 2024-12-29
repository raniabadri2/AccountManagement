import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcompteComponent } from './showcompte.component';

describe('ShowcompteComponent', () => {
  let component: ShowcompteComponent;
  let fixture: ComponentFixture<ShowcompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcompteComponent]
    });
    fixture = TestBed.createComponent(ShowcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
