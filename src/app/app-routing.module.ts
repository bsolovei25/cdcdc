import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './dashboard/pages/home/home.component';
import {ManualinputPageComponent} from './dashboard/pages/manualinput-page/manualinput-page.component';
import { WidgetsPieCircleComponent } from './dashboard/widgets/widgets-pie/widgets-pie-circle/widgets-pie-circle.component';
import { NewWidgetsGridComponent } from './dashboard/components/new-widgets-grid/new-widgets-grid.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', component: HomeComponent},
  {path: 'manual-input', component: ManualinputPageComponent},
  {path: 'test', component: NewWidgetsGridComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
