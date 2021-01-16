import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule, STWidgetModule } from '@shared';

import { LayoutBasicComponent } from './basic/basic.component';
import { HeaderClearStorageComponent } from './basic/widgets/clear-storage.component';
import { HeaderFullScreenComponent } from './basic/widgets/fullscreen.component';
import { HeaderI18nComponent } from './basic/widgets/i18n.component';
import { HeaderIconComponent } from './basic/widgets/icon.component';
import { HeaderNotifyComponent } from './basic/widgets/notify.component';
import { HeaderRTLComponent } from './basic/widgets/rtl.component';
import { HeaderSearchComponent } from './basic/widgets/search.component';
import { HeaderTaskComponent } from './basic/widgets/task.component';
import { HeaderUserComponent } from './basic/widgets/user.component';
import { LayoutBlankComponent } from './blank/blank.component';
import { LayoutPassportComponent } from './passport/passport.component';

const COMPONENTS = [LayoutBasicComponent, LayoutBlankComponent, LayoutPassportComponent];

const HEADERCOMPONENTS = [
  HeaderSearchComponent,
  HeaderNotifyComponent,
  HeaderTaskComponent,
  HeaderIconComponent,
  HeaderFullScreenComponent,
  HeaderI18nComponent,
  HeaderClearStorageComponent,
  HeaderUserComponent,
  HeaderRTLComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    STWidgetModule
  ],
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
  exports: [...COMPONENTS, SharedModule, STWidgetModule],
})
export class LayoutModule {}
