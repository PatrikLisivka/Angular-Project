import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UpdateEquipmentComponent } from './update-equipment/update-equipment.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'equipment/update/:id', component: UpdateEquipmentComponent, canActivate: [AuthGuard] }
];
