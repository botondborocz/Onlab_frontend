import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcontentaddgoalscorersComponent } from './dialogcontentaddgoalscorers.component';

describe('DialogcontentaddgoalscorersComponent', () => {
  let component: DialogcontentaddgoalscorersComponent;
  let fixture: ComponentFixture<DialogcontentaddgoalscorersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogcontentaddgoalscorersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogcontentaddgoalscorersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
