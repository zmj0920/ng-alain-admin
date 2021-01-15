import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STData } from '@delon/abc/st';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-crud-configuration-item-modal',
  templateUrl: './configuration-item-modal.component.html',
})
export class CrudConfigurationItemModalComponent implements OnInit {
  @Input()
  modalState!: STData;
  @Input() mode!: string;
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      rootServerApiAddress: [this.modalState.currentConfig, [Validators.required, Validators.pattern(/^([\w\d]+\.[\w\d]+)(\.[\w\d]+)*$/)]],
    });
  }

  resetForm(): void {
    this.formGroup.patchValue({ rootServerApiAddress: this.modalState.defaultConfig });
  }

  getAddress(): string {
    if (this.mode === 'restore') {
      return this.modalState.defaultConfig;
    }
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.controls[key].markAsDirty();
      this.formGroup.controls[key].updateValueAndValidity();
    });
    if (this.formGroup.invalid) {
      return '';
    }
    const data = this.formGroup.value;
    return data.rootServerApiAddress;
  }

  setConfigurationItem(): Observable<any> {
    const address = this.getAddress();
    if (!address) {
      return of(false);
    }
    return of(address);
  }

}
