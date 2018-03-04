import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { AppRoutingModule } from './/app-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { IndexComponent } from './index/index.component';

// 3rd party comps
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { SliderComponent } from './index/slider/slider.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailsComponent,
    ConfigurationComponent,
    IndexComponent,
    SliderComponent,
    TopnavComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
