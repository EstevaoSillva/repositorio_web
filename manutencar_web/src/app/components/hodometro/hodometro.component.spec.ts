import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodometroComponent } from './hodometro.component';

describe('HodometroComponent', () => {
  let component: HodometroComponent;
  let fixture: ComponentFixture<HodometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodometroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
