import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-header',
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" routerLink="/">
        <img
          *ngIf="logo"
          [attr.src]="logo"
          width="30"
          height="30"
          class="d-inline-block align-top mr-2"
          alt="App Logo"
          loading="lazy"
        />
        {{ name }}
      </a>
      <div class="collapse navbar-collapse">
        <div class="mr-auto">
          <layout-header-links [links]="linksLeft"></layout-header-links>
        </div>
        <div class="text-right">
          <layout-header-links [links]="linksRight"></layout-header-links>
        </div>
      </div>
    </nav>
  `,
})
export class LayoutHeaderComponent {
  @Input() linksLeft: { label: string; route: string }[] = [{ label: 'Dashboard', route: '/dashboard' }]
  @Input() linksRight: { label: string; route: string }[] = [{ label: 'About', route: '/about' }]
  @Input() logo: string
  @Input() name: string
}
