import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormInputComponent } from './ui-form-input.component'

@NgModule({
  declarations: [UiFormInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: UiFormInputComponent,
          wrappers: ['form-field'],
        },
        { name: 'string', extends: 'input' },
        {
          name: 'password',
          extends: 'input',
          defaultOptions: {
            templateOptions: { type: 'password' },
          },
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
      ],
    }),
  ],
})
export class UiFormInputModule {}
