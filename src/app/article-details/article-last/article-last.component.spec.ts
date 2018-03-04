import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLastComponent } from './article-last.component';

describe('ArticleLastComponent', () => {
  let component: ArticleLastComponent;
  let fixture: ComponentFixture<ArticleLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
