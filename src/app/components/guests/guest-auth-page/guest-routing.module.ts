import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestAuthPageComponent } from './guest-auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: GuestAuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
