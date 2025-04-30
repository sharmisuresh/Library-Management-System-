import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedbookComponent } from './borrowedbook.component';

describe('BorrowedbookComponent', () => {
  let component: BorrowedbookComponent;
  let fixture: ComponentFixture<BorrowedbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowedbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
