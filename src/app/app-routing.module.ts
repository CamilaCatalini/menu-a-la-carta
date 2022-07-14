import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent  } from './home/home.component';
import { IngresoComponent } from './ingreso/ingreso.component';

const routes: Routes = [
  { path: '',        component: IngresoComponent },
  { path: 'home',        component: HomeComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }