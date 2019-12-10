import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxForMessageComponent } from './dialog-box-for-message.component';

describe('DialogBoxForMessageComponent', () => {
  let component: DialogBoxForMessageComponent;
  let fixture: ComponentFixture<DialogBoxForMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxForMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxForMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
