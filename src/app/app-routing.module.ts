import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './pages/event-list/event-list.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { AppRoles } from './app.roles';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { NoAccesComponent } from './pages/no-acces/no-acces.component';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { PlaceListComponent } from './pages/place-list/place-list.component';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';

const routes: Routes = [
  {
    path: "events",
    component: EventListComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'All Events'
    }
  },
  {
    path: "event",
    pathMatch: "full",
    component: EventDetailComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Update],
      pagetitle: 'Change Event'
    }
  },
  {
    path: "event/:id",
    pathMatch: "full",
    component: EventDetailComponent
  },
  {
    path: "members",
    component: MemberListComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'All Members'
    }
  },
  {
    path: "member",
    pathMatch: "full",
    component: MemberDetailComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Update],
      pagetitle: 'Change Member'
    }
  },
  {
    path: "member/:id",
    pathMatch: "full",
    component: MemberDetailComponent
  },
  {
    path: "places",
    component: PlaceListComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'All Places'
    }
  },
  {
    path: "place",
    pathMatch: "full",
    component: PlaceDetailComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Update],
      pagetitle: 'Change Event'
    }
  },
  {
    path: "place/:id",
    pathMatch: "full",
    component: EventDetailComponent
  },
  {
    path: "categorys",
    component: CategoryListComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'All Categorys'
    }
  },
  {
    path: "category",
    pathMatch: "full",
    component: CategoryDetailComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Update],
      pagetitle: 'Change Category'
    }
  },
  {
    path: "category/:id",
    pathMatch: "full",
    component: CategoryDetailComponent
  },
  {
    path: "noacces",
    component: NoAccesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
