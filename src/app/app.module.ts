import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Rutas
import { APP_ROUTES } from './app.routes';


// Modulos
import { PagesModule } from './pages/pages.module';

// Servicios

import { ServiceModule } from './services/service.module';



// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphqlModule } from './graphql/graphql.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Interceptores
import { InterceptorsModule } from './interceptors/interceptors.module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    InterceptorsModule,
    GraphqlModule,
    BrowserAnimationsModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
