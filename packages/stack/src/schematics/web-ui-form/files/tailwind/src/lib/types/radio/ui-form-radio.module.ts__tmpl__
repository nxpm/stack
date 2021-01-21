import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

import { UiFormRadioComponent } from './ui-form-radio.component'

@NgModule({
  declarations: [UiFormRadioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'radio',
          component: UiFormRadioComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormRadioModule {}
