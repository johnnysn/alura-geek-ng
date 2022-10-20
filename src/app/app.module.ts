import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Definir locale PT-BR
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './front/banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { LinhaProdutosComponent } from './front/linha-produtos/linha-produtos.component';
import { FrontComponent } from './front/front.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProdutoHomeComponent } from './produto/produto-home/produto-home.component';
import { ProdutoEditComponent } from './produto/produto-edit/produto-edit.component';
import { ProdutoShortComponent } from './produto/produto-short/produto-short.component';
import { ProdutoDetailsComponent } from './produto/produto-details/produto-details.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {fakeBackendProvider} from "./fake-backend.provider";
import {ErrorCatchingInterceptor, JwtInterceptor} from "./interceptors";
import { ProdutoVerTudoComponent } from './produto/produto-ver-tudo/produto-ver-tudo.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    LinhaProdutosComponent,
    FrontComponent,
    LoginComponent,
    ProdutoHomeComponent,
    ProdutoEditComponent,
    ProdutoShortComponent,
    ProdutoDetailsComponent,
    ProdutoVerTudoComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
