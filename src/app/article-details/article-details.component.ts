import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.less']
})
export class ArticleDetailsComponent implements OnInit {
  title = 'Detale będą tu: ';
  constructor() { }

  ngOnInit() {
  }

}
