import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './dashboard/pages/home/home.component';
import {ManualinputPageComponent} from './dashboard/pages/manualinput-page/manualinput-page.component';
import { WidgetPiesComponent } from './dashboard/widgets/widgets-pie2/widget-pies/widget-pies/widget-pies.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', component: HomeComponent},
  {path: 'manual-input', component: ManualinputPageComponent},
  {path: 'test', component: WidgetPiesComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
