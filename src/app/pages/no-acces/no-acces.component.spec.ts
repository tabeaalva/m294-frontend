import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccesComponent } from './no-acces.component';

describe('NoAccesComponent', () => {
  let component: NoAccesComponent;
  let fixture: ComponentFixture<NoAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAccesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
