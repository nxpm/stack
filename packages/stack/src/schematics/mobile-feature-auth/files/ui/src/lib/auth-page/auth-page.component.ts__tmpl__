import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'auth-page',
  template: `
    <ui-page [pageTitle]="pageTitle">
      <div>
        <ion-avatar>
          <img src="assets/images/logo.png" alt="App Logo" />
        </ion-avatar>
      </div>

      <div class="" *ngIf="errors">
        {{ errors }}
      </div>

      <ng-container *ngIf="buttonTitle || (linkTitle && linkPath)">
        <ion-card>
          <ui-form [form]="form" [fields]="fields" [model]="model" (submitForm)="submitForm.emit(model)">
            <div class="">
              <ion-button [disabled]="!form.valid" color="primary" type="submit">
                {{ buttonTitle }}
              </ion-button>

              <ion-button *ngIf="linkPath && linkTitle" [routerLink]="linkPath" fill="outline">
                {{ linkTitle }}
              </ion-button>
            </div>
          </ui-form>
        </ion-card>
      </ng-container>
    </ui-page>
  `,
})
export class AuthPageComponent {
  @Input() buttonTitle: string
  @Input() linkPath: string
  @Input() linkTitle: string
  @Input() errors: any
  @Input() form = new FormGroup({})
  @Input() fields = []
  @Input() model = {}
  @Input() pageTitle: string
  @Output() submitForm = new EventEmitter()
}
