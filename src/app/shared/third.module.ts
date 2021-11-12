import { Type } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { NgxTinymceModule } from 'ngx-tinymce';
import { UEditorModule } from 'ngx-ueditor';
export const THIRDMODULES: Array<Type<any>> = [CountdownModule, UEditorModule, NgxTinymceModule];
