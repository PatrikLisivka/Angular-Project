import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'login', component: LoginComponent }
];
