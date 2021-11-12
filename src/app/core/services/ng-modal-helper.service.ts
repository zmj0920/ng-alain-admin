import { Injectable, TemplateRef, Type } from '@angular/core';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Observer } from 'rxjs';

export interface ModalHelperOptions {
  /** 大小；例如：lg、600，默认：`lg` */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number;
  /** 对话框 参数 */
  modalOptions?: ModalOptions;
  /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
  exact?: boolean;
  /** 是否包裹标签页，修复模态包含标签间距问题 */
  includeTabs?: boolean;
}

/**
 * Deep merge object.
 *
 * 深度合并对象
 *
 * @param original 原始对象
 * @param arrayProcessMethod 数组处理方式
 *  - `true` 表示替换新值，不管新值为哪种类型
 *  - `false` 表示会合并整个数组（将旧数据与新数据合并成新数组）
 * @param objects 要合并的对象
 */
export function deepMergeKey(original: unknown, arrayProcessMethod: boolean, ...objects: any[]): any {
  if (Array.isArray(original) || typeof original !== 'object') return original;

  const isObject = (v: unknown) => typeof v === 'object';

  const merge = (target: any, obj: any) => {
    Object.keys(obj)
      .filter(key => key !== '__proto__' && Object.prototype.hasOwnProperty.call(obj, key))
      .forEach(key => {
        const fromValue = obj[key];
        const toValue = target[key];
        if (Array.isArray(toValue)) {
          target[key] = arrayProcessMethod ? fromValue : [...toValue, ...fromValue];
        } else if (typeof fromValue === 'function') {
          target[key] = fromValue;
        } else if (fromValue != null && isObject(fromValue) && toValue != null && isObject(toValue)) {
          target[key] = merge(toValue, fromValue);
        } else {
          target[key] = fromValue.silce(0);
        }
      });
    return target;
  };

  objects.filter(v => v != null && isObject(v)).forEach(v => merge(original, v));

  return original;
}

/**
 * Deep merge object.
 *
 * 深度合并对象
 */
export function deepMerge(original: unknown, ...objects: unknown[]): any {
  return deepMergeKey(original, false, ...objects);
}

/**
 * 对话框辅助类
 */
@Injectable({ providedIn: 'root' })
export class NgModalHelperService {
  constructor(private srv: NzModalService) {}

  /**
   * 构建一个对话框
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   *
   * @example
   * this.modalHelper.create(FormEditComponent, { i }).subscribe(res => this.load());
   * // 对于组件的成功&关闭的处理说明
   * // 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
   * this.nzModalRef.close(data);
   * this.nzModalRef.close();
   * // 关闭
   * this.nzModalRef.destroy();
   */
  create(comp: TemplateRef<any> | Type<any>, params?: any, options?: ModalHelperOptions): Observable<any> {
    options = deepMerge(
      {
        size: 'lg',
        exact: true,
        includeTabs: false
      },
      options
    );
    return new Observable((observer: Observer<any>) => {
      const { size, includeTabs, modalOptions } = options as ModalHelperOptions;
      let cls = '';
      let width = '';
      if (size) {
        if (typeof size === 'number') {
          width = `${size}px`;
        } else {
          cls = `modal-${size}`;
        }
      }
      if (includeTabs) {
        cls += ' modal-include-tabs';
      }
      if (modalOptions && modalOptions.nzWrapClassName) {
        cls += ` ${modalOptions.nzWrapClassName}`;
        delete modalOptions.nzWrapClassName;
      }
      const defaultOptions: ModalOptions = {
        nzWrapClassName: cls,
        nzContent: comp,
        nzWidth: width ? width : undefined,
        nzFooter: null,
        nzComponentParams: params
      };
      const subject = this.srv.create({ ...defaultOptions, ...modalOptions });
      const afterClose$ = subject.afterClose.subscribe((res: any) => {
        if (options!.exact === true) {
          if (res != null) {
            observer.next(res);
          }
        } else {
          observer.next(res);
        }
        observer.complete();
        afterClose$.unsubscribe();
      });
    });
  }

  /**
   * 构建静态框，点击蒙层不允许关闭
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   *
   * @example
   * this.modalHelper.open(FormEditComponent, { i }).subscribe(res => this.load());
   * // 对于组件的成功&关闭的处理说明
   * // 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
   * this.nzModalRef.close(data);
   * this.nzModalRef.close();
   * // 关闭
   * this.nzModalRef.destroy();
   */
  createStatic(comp: TemplateRef<any> | Type<any>, params?: any, options?: ModalHelperOptions): Observable<any> {
    const modalOptions = {
      nzMaskClosable: false,
      ...(options && options.modalOptions)
    };
    return this.create(comp, params, { ...options, modalOptions });
  }
}
