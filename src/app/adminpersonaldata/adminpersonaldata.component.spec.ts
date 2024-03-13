import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpersonaldataComponent } from './adminpersonaldata.component';

describe('AdminpersonaldataComponent', () => {
  let component: AdminpersonaldataComponent;
  let fixture: ComponentFixture<AdminpersonaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpersonaldataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminpersonaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
