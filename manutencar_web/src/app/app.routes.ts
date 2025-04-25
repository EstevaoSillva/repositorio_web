import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AbastecimentoComponent } from './components/abastecimento/abastecimento.component';
import { AbastecimentoPaiComponent } from './components/abastecimento-pai/abastecimento-pai.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'veiculos', component: VehicleComponent },
  { path: 'veiculos-list', component: VehicleListComponent },
  { path: 'abastecimento', component: AbastecimentoComponent },
  { path: 'abastecimento-pai', component: AbastecimentoPaiComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];