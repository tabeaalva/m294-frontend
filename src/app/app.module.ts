import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AppAuthGuard } from './guard/app.auth.guard';
import { AppAuthService } from './service/app.auth.service';
import { IsInRolesDirective } from './directives/is-in-roles.dir';
import { environment } from './enviroments/environment';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NoAccesComponent } from './pages/no-acces/no-acces.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { PlaceListComponent } from './pages/place-list/place-list.component';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/CALENDAR',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'demoapp',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    IsInRolesDirective,
    LoginComponent,
    NoAccesComponent,
    EventListComponent,
    EventDetailComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    MemberDetailComponent,
    MemberListComponent,
    PlaceListComponent,
    PlaceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: AuthConfig,
      useValue: authConfig
    },
    {
      provide: OAuthStorage,
      useFactory: storageFactory
    },
    AppAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally()
  }
}
