import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FeedRoutingModule } from './feed-routing.module';
import { HomeArticlesComponent } from './home-articles/home-articles.component';

@NgModule({
    declarations: [MainComponent, HomeArticlesComponent],
    imports: [CommonModule,  
         FeedRoutingModule],
    exports: [],
  })
  export class  FeedModule {}