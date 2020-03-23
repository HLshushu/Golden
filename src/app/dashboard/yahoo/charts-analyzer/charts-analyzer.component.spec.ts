import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsAnalyzerComponent } from './charts-analyzer.component';

describe('ChartsAnalyzerComponent', () => {
  let component: ChartsAnalyzerComponent;
  let fixture: ComponentFixture<ChartsAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
