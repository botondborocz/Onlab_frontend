import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuardUser} from './auth-guard/auth.guarduser';
import {UserdashboardComponent} from './userdashboard/userdashboard.component';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';
import {PersonaldataComponent} from './userpersonaldata/userpersonaldata.component';
import {FavouritesComponent} from './favourites/favourites.component';
import {UserhomeComponent} from './userhome/userhome.component';
import {AdminhomeComponent} from './adminhome/adminhome.component';
import {AdminpersonaldataComponent} from './adminpersonaldata/adminpersonaldata.component';


export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'user', component: UserdashboardComponent, canActivate: [AuthGuardUser],

    children: [
      {
        path: 'home', component: UserhomeComponent
      },

      {
        path: 'personaldata', component: PersonaldataComponent
      },

      {
        path: 'favourites', component: FavouritesComponent
      }
    ]
  },
  {
    path: 'admin', component: AdmindashboardComponent, canActivate: [AuthGuardUser],

    children: [
      {
        path: 'home', component: AdminhomeComponent
      },

      {
        path: 'personaldata', component: AdminpersonaldataComponent
      }
    ]
  }
];
