import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardStud } from './auth-guard/auth.guardstudent';
import { AuthGuardProf } from './auth-guard/auth.guardprofessor';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';


export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'signup', component:SignupComponent
    }
];
