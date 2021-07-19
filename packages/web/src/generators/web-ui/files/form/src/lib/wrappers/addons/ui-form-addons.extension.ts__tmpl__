import { FormlyFieldConfig } from '@ngx-formly/core'

export function addonsExtension(field: FormlyFieldConfig): any {
  if (!field.templateOptions || (field.wrappers && field.wrappers.indexOf('addons') !== -1)) {
    return
  }

  if (field.templateOptions.addonLeft || field.templateOptions.addonRight) {
    field.wrappers = [...(field.wrappers || []), 'addons']
    field.templateOptions.attributes = {
      ...(field.templateOptions?.attributes || {}),
      style: 'padding-left: 2.5rem;',
    }
  }
}
