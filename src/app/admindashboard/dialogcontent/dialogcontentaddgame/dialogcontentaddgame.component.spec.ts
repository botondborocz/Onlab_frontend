import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcontentaddgameComponent } from './dialogcontentaddgame.component';

describe('DialogcontentaddgameComponent', () => {
  let component: DialogcontentaddgameComponent;
  let fixture: ComponentFixture<DialogcontentaddgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogcontentaddgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogcontentaddgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
