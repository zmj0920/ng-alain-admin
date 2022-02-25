import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'bind-mobile',
  templateUrl: './bind-mobile.component.html',
  styleUrls: ['./bind-mobile.component.less']
})
export class BindMobileComponent implements OnInit, OnDestroy {
  constructor(fb: FormBuilder, private cdr: ChangeDetectorRef, private modal: NzModalService) {
    this.form = fb.group({
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]]
    });
  }
  ngOnInit(): void {}

  get mobile(): AbstractControl {
    return this.form.controls['mobile'];
  }
  get captcha(): AbstractControl {
    return this.form.controls['captcha'];
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

  formInvalid() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      return true;
    }
  }
}
