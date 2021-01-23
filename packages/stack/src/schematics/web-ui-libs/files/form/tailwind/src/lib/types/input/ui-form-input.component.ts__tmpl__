import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <input
      *ngIf="type !== 'number'; else numberTmp"
      [class]="classes"
      [ngClass]="classNames"
      [type]="type"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
    />
    <ng-template #numberTmp>
      <input
        [class]="classes"
        [ngClass]="classNames"
        type="number"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [class.is-invalid]="showError"
      />
    </ng-template>
  `,
})
export class UiFormInputComponent extends FieldType {
  formControl!: FormControl

  get type(): string {
    return this.to.type || 'text'
  }

  get classNames(): string {
    return this.showError
      ? 'border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
      : ''
  }

  get classes(): string {
    return 'shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md block w-full sm:text-sm'
  }
}
