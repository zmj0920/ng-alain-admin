import { NgModule } from '@angular/core';
import { Book1Component } from '@component/book1/book1.component';
import { Book2Component } from '@component/book2/book2.component';
import { LayoutComponent } from '@component/layout/layout.component';
import { Book3Component } from '@component/book3/book3.component';
import { ProfileEditorComponent } from '@component/profile-editor/profile-editor.component';
import { WelcomeComponent } from '@pages/welcome/welcome.component';

export const COMPONENTS = [
    Book1Component,
    Book2Component,
    LayoutComponent,
    Book3Component,
    WelcomeComponent,
    ProfileEditorComponent
  ];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class ComponentModule { }
