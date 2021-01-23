import { Component, ChangeDetectionStrategy, ViewChild, NgZone } from '@angular/core'
import { FormControl, SelectControlValueAccessor } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { take } from 'rxjs/operators'

@Component({
  template: `
    <select
      *ngIf="to.multiple; else singleSelect"
      [class]="classNames"
      multiple
      [class.custom-select]="to.customSelect"
      [formControl]="formControl"
      [compareWith]="to.compareWith"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
      <ng-container *ngIf="to.options | formlySelectOptions: field | async as opts">
        <ng-container *ngIf="to._flatOptions; else grouplist">
          <ng-container *ngFor="let opt of opts">
            <option [ngValue]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
          </ng-container>
        </ng-container>

        <ng-template #grouplist>
          <ng-container *ngFor="let opt of opts">
            <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
              {{ opt.label }}
            </option>
            <ng-template #optgroup>
              <optgroup [label]="opt.label">
                <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                  {{ child.label }}
                </option>
              </optgroup>
            </ng-template>
          </ng-container>
        </ng-template>
      </ng-container>
    </select>

    <ng-template #singleSelect>
      <select
        class="pr-10"
        [class]="classNames"
        [formControl]="formControl"
        [compareWith]="to.compareWith"
        [class.custom-select]="to.customSelect"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
      >
        <option *ngIf="to.placeholder" [ngValue]="undefined">{{ to.placeholder }}</option>
        <ng-container *ngIf="to.options | formlySelectOptions: field | async as opts">
          <ng-container *ngIf="to._flatOptions; else grouplist">
            <ng-container *ngFor="let opt of opts">
              <option [ngValue]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
            </ng-container>
          </ng-container>

          <ng-template #grouplist>
            <ng-container *ngFor="let opt of opts">
              <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
                {{ opt.label }}
              </option>
              <ng-template #optgroup>
                <optgroup [label]="opt.label">
                  <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                    {{ child.label }}
                  </option>
                </optgroup>
              </ng-template>
            </ng-container>
          </ng-template>
        </ng-container>
      </select>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormSelectComponent extends FieldType {
  formControl!: FormControl
  defaultOptions = {
    templateOptions: {
      options: [],
      compareWith(o1: any, o2: any): any {
        return o1 === o2
      },
    },
  }

  // workaround for https://github.com/angular/angular/issues/10010
  @ViewChild(SelectControlValueAccessor) set selectAccessor(s: any) {
    if (!s) {
      return
    }

    const writeValue = s.writeValue.bind(s)
    if (s._getOptionId(s.value) === null) {
      writeValue(s.value)
    }

    s.writeValue = (value: any) => {
      const id = s._idCounter
      writeValue(value)
      if (value === null) {
        this.ngZone.onStable
          .asObservable()
          .pipe(take(1))
          .subscribe(() => {
            if (
              id !== s._idCounter &&
              s._getOptionId(value) === null &&
              s._elementRef.nativeElement.selectedIndex !== -1
            ) {
              writeValue(value)
            }
          })
      }
    }
  }

  get classNames(): string {
    return 'mt-1 block w-full pl-3 py-2 text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md'
  }

  constructor(private ngZone: NgZone) {
    super()
  }
}
