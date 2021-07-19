import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-header-links',
  template: `
    <ul class="flex space-x-3 text-gray-500">
      <li *ngFor="let link of links">
        <a routerLinkActive="text-gray-100" [routerLink]="link.route">{{ link.label }}</a>
      </li>
    </ul>
  `,
})
export class LayoutHeaderLinksComponent {
  @Input() links: { label: string; route: string }[] = []
}
