import { PageHeaderModule } from '@delon/abc/page-header';
import { ResultModule } from '@delon/abc/result';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { NoticeIconModule } from '@delon/abc/notice-icon';
import { PdfModule } from '@delon/abc/pdf';
import { ReuseTabModule } from '@delon/abc/reuse-tab';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { ThemeBtnModule } from '@delon/theme/theme-btn';
import { AvatarListModule } from '@delon/abc/avatar-list';

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
];
