import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-header-links',
  template: `
    <ul class="navbar-nav">
      <li class="nav-item" routerLinkActive="active" *ngFor="let link of links">
        <a class="nav-link" [routerLink]="link.route">{{ link.label }}</a>
      </li>
    </ul>
  `,
})
export class LayoutHeaderLinksComponent {
  @Input() links: { label: string; route: string }[] = []
}
