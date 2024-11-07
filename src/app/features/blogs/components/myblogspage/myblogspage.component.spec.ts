import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyblogspageComponent } from './myblogspage.component';

describe('MyblogspageComponent', () => {
  let component: MyblogspageComponent;
  let fixture: ComponentFixture<MyblogspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyblogspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyblogspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
