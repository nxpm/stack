import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-footer',
  template: `
    <footer class="d-flex justify-content-center p-1 bg-dark navbar-dark" *ngIf="html">
      <small class="text-muted" [innerHTML]="html"></small>
    </footer>
  `,
})
export class LayoutFooterComponent {
  @Input() html?: string
}
