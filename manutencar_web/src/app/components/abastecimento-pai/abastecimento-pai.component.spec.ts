import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentoPaiComponent } from './abastecimento-pai.component';

describe('AbastecimentoPaiComponent', () => {
  let component: AbastecimentoPaiComponent;
  let fixture: ComponentFixture<AbastecimentoPaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbastecimentoPaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbastecimentoPaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
