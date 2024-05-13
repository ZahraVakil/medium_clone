import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeArticlesComponent } from './home-articles/home-articles.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [

    {
        path: '',
        component: MainComponent,
      },

      
    {
        path: 'articles',
        component: HomeArticlesComponent,
        canActivate: [AuthGuard],

      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
