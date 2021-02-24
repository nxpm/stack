import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <div class="mt-4 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg space-y-4">
        <ng-container *ngFor="let option of to.options | formlySelectOptions: field | async; let i = index">
          <div class="relative flex items-start">
            <div class="flex items-center h-5">
              <input
                type="checkbox"
                class="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded"
                [id]="id + '_' + i"
                [value]="option.value"
                [checked]="isChecked(option)"
                [formlyAttributes]="field"
                (change)="onChange(option.value, $event.target)"
              />
            </div>
            <div class="ml-3 text-sm">
              <label class="font-medium text-gray-700 dark:text-gray-300" [for]="id + '_' + i">
                {{ option.label }}
              </label>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormMulticheckboxComponent extends FieldType {
  formControl!: FormControl
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  }

  onChange(value: any, target: any): void {
    if (this.to.type === 'array') {
      this.formControl.patchValue(
        target.checked
          ? [...(this.formControl.value || []), value]
          : [...(this.formControl.value || [])].filter((o) => o !== value),
      )
    } else {
      this.formControl.patchValue({ ...this.formControl.value, [value]: target.checked })
    }
    this.formControl.markAsTouched()
  }

  isChecked(option: any): boolean {
    const value = this.formControl.value

    return value && (this.to.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value])
  }
}
