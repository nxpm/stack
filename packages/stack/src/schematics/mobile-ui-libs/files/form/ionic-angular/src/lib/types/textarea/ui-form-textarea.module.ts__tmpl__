import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

import { UiFormTextareaComponent } from './ui-form-textarea.component'

@NgModule({
  declarations: [UiFormTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'textarea',
          component: UiFormTextareaComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormTextareaModule {}
