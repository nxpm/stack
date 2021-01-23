import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'

@Component({
  templateUrl: './ui-form-addons.component.html',
  styleUrls: ['./ui-form-addons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormAddonsComponent extends FieldWrapper {
  addonRightClick($event: any): void {
    console.log('addonRightClick')
    if (this.to.addonRight.onClick) {
      this.to.addonRight.onClick(this.to, this, $event)
    }
  }

  addonLeftClick($event: any): void {
    console.log('addonLeftClick')
    if (this.to.addonLeft.onClick) {
      this.to.addonLeft.onClick(this.to, this, $event)
    }
  }
}
