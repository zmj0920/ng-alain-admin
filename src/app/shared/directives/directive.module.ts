import { Type } from '@angular/core';
import { RainbowDirective } from './rainbow/rainbow.directive';
import { TestDirective } from './test/test.directive';
export const DIRECTIVES_MODULES: Type<any>[] = [TestDirective, RainbowDirective];
