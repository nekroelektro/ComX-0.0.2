import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsBannerComponent } from './article-details-banner.component';

describe('ArticleDetailsBannerComponent', () => {
  let component: ArticleDetailsBannerComponent;
  let fixture: ComponentFixture<ArticleDetailsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
