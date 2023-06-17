import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcardComponent } from './detailcard.component';

describe('DetailcardComponent', () => {
  let component: DetailcardComponent;
  let fixture: ComponentFixture<DetailcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailcardComponent]
    });
    fixture = TestBed.createComponent(DetailcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
