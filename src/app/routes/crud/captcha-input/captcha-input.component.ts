import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StepFormComponent } from '../step-form/step-form.component';

@Component({
  selector: 'captcha-input',
  templateUrl: './captcha-input.component.html',
  styleUrls: ['./captcha-input.component.less']
})
export class CaptchaInputComponent implements OnDestroy {
  constructor(fb: FormBuilder, private cdr: ChangeDetectorRef, private modal: NzModalService) {
    this.form = fb.group({
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]]
    });
  }

  get mobile(): AbstractControl {
    return this.form.controls.mobile;
  }
  get captcha(): AbstractControl {
    return this.form.controls.captcha;
  }
  form: FormGroup;
  loading = false;

  count = 0;
  interval$: any;

  getCaptcha(): void {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.cdr.detectChanges();
    this.interval$ = setInterval(() => {
      this.count -= 1;
      this.cdr.detectChanges();
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }

  createModal(): void {
    this.modal.create({
      nzTitle: '修改手机号',
      nzContent: StepFormComponent,
      nzMaskClosable: false,
      nzOnOk: instance => {
        if (instance.step2FormInvalid()) {
          console.log(instance.step2Form.value);
          return new Promise(resolve => setTimeout(resolve, 1000));
        }
        return false;
      }
    });
  }
}
