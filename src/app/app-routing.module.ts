import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/feed/feed.module').then((mod) => mod.FeedModule),
      canActivate: [AuthGuard],

  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },

  {
    path: 'article',
    loadChildren: () =>
      import('./modules/articles/article.module').then((mod) => mod.ArticleModule),
      canActivate: [AuthGuard],

  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/userProfile/user.module').then((mod) => mod.UserModule),
      canActivate: [AuthGuard],

    },

  // {
  //   path: 'task',
  //   loadChildren: () =>
  //     import('./modules/tasks/tasks.module').then((mod) => mod.TaskModule),
  //     canActivate: [AuthGuard],

  // },

  {
    path: '**',
    loadChildren: () =>
      import('./modules/404/notFound.module').then((mod) => mod.PageNotFoundModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
