import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@routes/app-routing.module';
import { AppComponent } from '@pages/app/app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Book1Component } from './component/book1/book1.component';
import { Book2Component } from './component/book2/book2.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Book3Component } from './component/book3/book3.component';
import { SexPipe } from './utils/sex.pipe';
import { TestDirective } from './utils/test.directive';
import { ProfileEditorComponent } from './component/profile-editor/profile-editor.component';
import { BookService} from './service/book.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    Book1Component,
    Book2Component,
    LayoutComponent,
    Book3Component,
    SexPipe,
    TestDirective,
    ProfileEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    },
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
