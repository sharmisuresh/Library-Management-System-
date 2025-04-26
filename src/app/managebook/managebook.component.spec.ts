import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebookComponent } from './managebook.component';

describe('ManagebookComponent', () => {
  let component: ManagebookComponent;
  let fixture: ComponentFixture<ManagebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagebookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
