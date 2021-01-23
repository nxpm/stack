import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <textarea
      [formControl]="formControl"
      [cols]="to.cols"
      [rows]="to.rows"
      class="shadow-sm block w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300 rounded-md"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormTextareaComponent extends FieldType {
  formControl!: FormControl
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1,
    },
  }
}
