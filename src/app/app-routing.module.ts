import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonListComponent } from './person-list/person-list.component';
import { MeasurementsComponent } from './measurements/measurements.component';

const routes: Routes = [
  { path: 'form', component: PersonFormComponent },
  { path: 'list', component: PersonListComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'measurements', component: MeasurementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
