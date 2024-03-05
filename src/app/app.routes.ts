import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardUser } from './auth-guard/auth.guarduser';
import { AuthGuardAdmin } from './auth-guard/auth.guardadmin';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { PersonaldataComponent } from './personaldata/personaldata.component';


export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'signup', component:SignupComponent
    },
    {
        path:'user', component:UserdashboardComponent, canActivate: [AuthGuardUser],

        /*children:[
            {
                path: 'personaldata', component:PersonaldataComponent
            },
            
            {
                path: 'subjects', component:SubjectsComponent
            }, 

            {
                path: 'exams', component:ExamsComponent
            },

            {
                path: 'enrollToExam', component:EnrolltoexamComponent
            },

            {
                path: 'pickUpSubject', component:PickupsubjectComponent
            }
        ]*/
    }, 
    {
        path:'admin', component:AdmindashboardComponent, canActivate: [AuthGuardUser],

        children:[
            {
                path: 'personaldata', component:PersonaldataComponent
            }
            /*
            {
                path: 'subjects', component:SubjectsComponent
            }, 

            {
                path: 'exams', component:ExamsComponent
            },

            {
                path: 'enrollToExam', component:EnrolltoexamComponent
            },

            {
                path: 'pickUpSubject', component:PickupsubjectComponent
            }*/
        ]
    }
];
