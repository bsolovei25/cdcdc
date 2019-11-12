import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './dashboard/pages/home/home.component';
import {ManualinputPageComponent} from './dashboard/pages/manualinput-page/manualinput-page.component';
import { WidgetsPieComponent } from './dashboard/widgets/widgets-pie/widgets-pie/widgets-pie.component';
import { WidgetsPieCircleComponent } from './dashboard/widgets/widgets-pie/widgets-pie-circle/widgets-pie-circle.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', component: HomeComponent},
  {path: 'manual-input', component: ManualinputPageComponent},
  {path: 'widget-pie', component: WidgetsPieComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
