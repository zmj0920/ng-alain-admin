import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Player3Component } from './book2.component';

describe('Player3Component', () => {
  let component: Player3Component;
  let fixture: ComponentFixture<Player3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Player3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Player3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
