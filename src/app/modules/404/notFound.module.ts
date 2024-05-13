import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { PageNotFoundRoutingModule } from './notFound-routing.module';

@NgModule({
    declarations: [PageNotfoundComponent],
    imports: [CommonModule,  
         PageNotFoundRoutingModule],
    exports: [],
  })
  export class  PageNotFoundModule {}