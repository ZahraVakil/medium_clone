import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArticlesComponent } from './home-articles.component';

describe('HomeArticlesComponent', () => {
  let component: HomeArticlesComponent;
  let fixture: ComponentFixture<HomeArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeArticlesComponent]
    });
    fixture = TestBed.createComponent(HomeArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
