import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcontentgameComponent } from './dialogcontentgame.component';

describe('DialogcontentgameComponent', () => {
  let component: DialogcontentgameComponent;
  let fixture: ComponentFixture<DialogcontentgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogcontentgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogcontentgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
