import { PageHeaderModule } from '@delon/abc/page-header';
import { PdfModule } from '@delon/abc/pdf';
import { ResultModule } from '@delon/abc/result';
import { ReuseTabModule } from '@delon/abc/reuse-tab';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';


export const SHARED_DELON_MODULES = [STModule, SVModule, SEModule, PageHeaderModule, ResultModule, ReuseTabModule, PdfModule];
