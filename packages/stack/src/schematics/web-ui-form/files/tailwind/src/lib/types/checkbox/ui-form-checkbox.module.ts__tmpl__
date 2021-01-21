import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

import { UiFormCheckboxComponent } from './ui-form-checkbox.component'

@NgModule({
  declarations: [UiFormCheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          component: UiFormCheckboxComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'boolean',
          extends: 'checkbox',
        },
      ],
    }),
  ],
})
export class UiFormCheckboxModule {}
