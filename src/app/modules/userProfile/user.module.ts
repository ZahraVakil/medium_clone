import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { MyblogsComponent } from './myblogs/myblogs.component';

@NgModule({
    declarations: [ProfileComponent, MyblogsComponent],
    imports: [CommonModule,  
         UserRoutingModule],
    exports: [],
  })
  export class  UserModule {}