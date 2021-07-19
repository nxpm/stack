import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

export function minlengthValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `Should have at least ${field.templateOptions?.minLength} characters`
}

export function maxlengthValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.maxLength} characters`
}

export function minValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be more than ${field.templateOptions?.min}`
}

export function maxValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.max}`
}

export function emailValidatorMessage(err: any, field: FormlyFieldConfig): string {
  return `"${field.formControl?.value}" is not a valid email address`
}

export function emailValidator(control: AbstractControl): ValidationErrors {
  return Validators.email(control) as ValidationErrors
}
