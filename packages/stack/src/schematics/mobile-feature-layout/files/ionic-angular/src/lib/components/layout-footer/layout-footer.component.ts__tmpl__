import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-footer',
  template: `
    <footer class="bg-gray-800 text-gray-500 flex justify-center items-center px-4 py-2" *ngIf="html">
      <small class="text-muted" [innerHTML]="html"></small>
    </footer>
  `,
})
export class LayoutFooterComponent {
  @Input() html?: string
}
