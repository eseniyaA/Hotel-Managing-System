import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffPageComponent } from './staff-page.component';

const routes: Routes = [
  {
    path: '',
    component: StaffPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
