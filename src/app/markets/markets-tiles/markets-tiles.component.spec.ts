import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsTilesComponent } from './markets-tiles.component';

describe('MarketsTilesComponent', () => {
  let component: MarketsTilesComponent;
  let fixture: ComponentFixture<MarketsTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketsTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
