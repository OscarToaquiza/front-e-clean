import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { MantNewsComponent } from './news/mant-news/mant-news.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { MantUsersComponent } from './users/mant-users/mant-users.component';
import { ListCarsComponent } from './cars/list-cars/list-cars.component';
import { MantCarsComponent } from './cars/mant-cars/mant-cars.component';
import { MantTypeDataComponent } from './type-data/mant-type-data/mant-type-data.component';
import { ListTypeDataComponent } from './type-data/list-type-data/list-type.data.component';
import { ListBusinessComponent } from './business/list-business/list-business.component';
import { MantBusinessComponent } from './business/mant-business/mant-business.component';
import { ListContainersComponent } from './containers/list-containers/list-containers.component';
import { MantContainersComponent } from './containers/mant-containers/mant-containers.component';
import { ListNotificationsComponent } from './notifications/list-notificactions/list-notifications.component';
import { SeeNotificationComponent } from './notifications/see-notification/see-notification.component';
import { ListPaperworkComponent } from './paperWorkes/list-paperworks/list-paperwork.component';
import { MantPaperworkComponent } from './paperWorkes/mant-paperwork/mant-paperwork.component';
import { ListRoutercarComponent } from './routesCar/list-routescar/list-routercar.component';
import { MantRoutercarComponent } from './routesCar/mant-routercar/mant-routercar.component';
import { ListRecyclingProcessComponent } from './recycling-process/list-recycling-process/list-recycling-process.component';
import { MantRecyclingProcessComponent } from './recycling-process/mant-recycling-process/mant-recycling-process.component';
import { PrincipalMapComponent } from './home/principalMap/principal-map.component';
import { MainSatatisticsComponent } from './statistics/main-statistics/main-statistics.component';
import { EditNotificationComponent } from './notifications/edit-notifications/edit-notification.component';

const routes: Routes = [
    { 
        path: 'epagal', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'list-news', component: ListNewsComponent },
            { path: 'list-news/mant/:id', component: MantNewsComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'list-users', component: ListUsersComponent },
            { path: 'list-users/mant/:id', component: MantUsersComponent },
            { path: 'list-cars', component: ListCarsComponent },
            { path: 'list-cars/mant/:id', component: MantCarsComponent },
            { path: 'list-types-data', component: ListTypeDataComponent },
            { path: 'list-types-data/mant/:id', component: MantTypeDataComponent},
            { path: 'list-business', component: ListBusinessComponent },
            { path: 'list-business/mant/:id', component: MantBusinessComponent},
            { path: 'list-types-data', component: ListTypeDataComponent },
            { path: 'list-types-data/mant/:id', component: MantTypeDataComponent},
            { path: 'list-containers', component: ListContainersComponent },
            { path: 'list-containers/mant/:id', component: MantContainersComponent},
            { path: 'list-notifications', component: ListNotificationsComponent},
            { path: 'list-notifications/see/:id', component: SeeNotificationComponent},
            { path: 'list-paperworks', component: ListPaperworkComponent},
            { path: 'list-paperworks/mant/:id', component: MantPaperworkComponent },
            { path: 'list-router-car', component: ListRoutercarComponent },
            { path: 'list-router-car/mant/:id', component: MantRoutercarComponent },
            { path: 'list-recycling-process', component: ListRecyclingProcessComponent },
            { path: 'list-recycling-process/mant/:id', component: MantRecyclingProcessComponent },
            { path: 'home/view-mapa/notification/:id', component: EditNotificationComponent },
            { path: 'home/view-mapa/:id/:nombre', component: PrincipalMapComponent },
            { path: 'main-statistics', component: MainSatatisticsComponent },
        ]
    },
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


