import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldComponent } from './ui-form-field.component'

@NgModule({
  declarations: [UiFormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'form-field',
          component: UiFormFieldComponent,
        },
      ],
    }),
  ],
})
export class UiFormFieldModule {}
