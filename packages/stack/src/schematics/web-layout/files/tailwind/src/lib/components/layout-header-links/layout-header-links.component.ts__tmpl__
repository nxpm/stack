import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-header-links',
  template: `
    <div class="flex space-x-2 items-center">
      <div class="text-gray-400" *ngFor="let link of links">
        <a routerLinkActive="text-gray-200" [routerLink]="link.route">{{ link.label }}</a>
      </div>
    </div>
  `,
})
export class LayoutHeaderLinksComponent {
  @Input() links: { label: string; route: string }[] = []
}
