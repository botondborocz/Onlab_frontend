import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcontentaddscoreComponent } from './dialogcontentaddscore.component';

describe('DialogcontentaddscoreComponent', () => {
  let component: DialogcontentaddscoreComponent;
  let fixture: ComponentFixture<DialogcontentaddscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogcontentaddscoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogcontentaddscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
