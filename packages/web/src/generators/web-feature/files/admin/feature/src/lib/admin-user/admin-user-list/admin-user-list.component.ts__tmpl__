import { Component, OnInit } from '@angular/core'
import { AdminUserListStore } from './admin-user-list.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-page-header title="Users" linkPath="create" linkTitle="Create User"></ui-page-header>
      <ng-container *ngIf="vm.loading">
        <div class="flex py-36 animate-pulse justify-center align-center">LOADING...</div>
      </ng-container>
      <ng-container *ngIf="!vm.loading">
        <user-table [users]="vm.users"></user-table>
      </ng-container>
    </ng-container>
  `,
  providers: [AdminUserListStore],
})
export class AdminUserListComponent implements OnInit {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: AdminUserListStore) {}

  ngOnInit(): void {
    this.store.loadUsersEffect()
  }
}
