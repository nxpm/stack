import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'

@Component({
  template: `
    <div [class.has-error]="showError" class="mb-3">
      <label
        *ngIf="to.label && to.hideLabel !== true"
        [attr.for]="id"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
      </label>

      <div class="mt-1 relative">
        <ng-template #fieldComponent></ng-template>

        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" *ngIf="showError">
          <!-- Heroicon name: exclamation-circle -->
          <svg
            class="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div *ngIf="showError" class="mt-2 text-sm text-red-600" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <small *ngIf="to.description" class="mt-2 text-sm text-gray-500">{{ to.description }}</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormFieldComponent extends FieldWrapper {}
