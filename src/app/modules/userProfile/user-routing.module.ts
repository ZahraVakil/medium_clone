import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyblogsComponent } from './myblogs/myblogs.component';

const routes: Routes = [

    {
        path: 'profile',
        component: ProfileComponent,
    },

    {
        path: 'myblogs',
        component: MyblogsComponent,
    },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
