import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MobilesListComponent } from './mobiles-list/mobiles-list.component';
import { NewMobileComponent } from './new-mobile/new-mobile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Home" },
  { path: 'mobile/all', component: MobilesListComponent, title: "All Mobiles" },
  { path: 'mobile/new', component: NewMobileComponent, title: "New Mobile" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
