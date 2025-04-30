import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablebookComponent } from './availablebook.component';

describe('AvailablebookComponent', () => {
  let component: AvailablebookComponent;
  let fixture: ComponentFixture<AvailablebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailablebookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
