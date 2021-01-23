import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'

import {
  emailValidator,
  emailValidatorMessage,
  maxlengthValidationMessage,
  maxValidationMessage,
  minlengthValidationMessage,
  minValidationMessage,
} from './index'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'email', message: emailValidatorMessage },
      ],
      validators: [{ name: 'email', validation: emailValidator }],
    }),
  ],
})
export class UiFormValidatorsModule {}
