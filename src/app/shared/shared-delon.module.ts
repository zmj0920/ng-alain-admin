import { AvatarListModule } from '@delon/abc/avatar-list';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { NoticeIconModule } from '@delon/abc/notice-icon';
import { PageHeaderModule } from '@delon/abc/page-header';
import { PdfModule } from '@delon/abc/pdf';
import { ResultModule } from '@delon/abc/result';
import { ReuseTabModule } from '@delon/abc/reuse-tab';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';
import { SGModule } from '@delon/abc/sg';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { ThemeBtnModule } from '@delon/theme/theme-btn';

export const SHARED_DELON_MODULES = [
  STModule,
  SVModule,
  SEModule,
  PageHeaderModule,
  ResultModule,
  GlobalFooterModule,
  NoticeIconModule,
  PdfModule,
  ReuseTabModule,
  DelonACLModule,
  DelonFormModule,
  LayoutDefaultModule,
  SettingDrawerModule,
  ThemeBtnModule,
  AvatarListModule,
  SGModule
];
