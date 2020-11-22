import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@routes/app-routing.module';
import { AppComponent } from '@pages/app/app.component';
import { IconsProviderModule } from './icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NgZorroModule } from '@/app/ng-zorro';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { CoreModule } from '@/app/core';
import { AppStoreModule } from '@store/store.module';
import { ComponentModule } from '@/app/component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule,
    ComponentModule,
    CoreModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
