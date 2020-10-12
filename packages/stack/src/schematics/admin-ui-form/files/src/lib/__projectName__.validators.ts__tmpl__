import { Validators, FormControl, ValidationErrors } from '@angular/forms'

export function minlengthValidationMessage(err, field) {
  return `Should have at least ${field.templateOptions.minLength} characters`
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`
}

export function emailValidatorMessage(err, field) {
  return `"${field.formControl.value}" is not a valid email address`
}

export function emailValidator(control: FormControl): ValidationErrors {
  return Validators.email(control)
}
