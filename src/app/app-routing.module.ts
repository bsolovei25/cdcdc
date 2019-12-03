import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './dashboard/pages/home/home.component';
import { TruncatedPieSIconComponent } from './dashboard/widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', component: HomeComponent},
  {path: 'test', component: TruncatedPieSIconComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
