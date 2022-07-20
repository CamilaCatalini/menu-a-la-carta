import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserVerificationComponent  } from './user-verification/user-verification.component';
import { IngresoComponent } from './ingreso/ingreso.component';

const routes: Routes = [
  { path: '',        component: IngresoComponent },
  { path: 'home',        component: UserVerificationComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }