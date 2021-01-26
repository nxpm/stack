import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('./admin-user-list/admin-user-list.module').then((m) => m.AdminUserListModule),
          },
          {
            path: 'create',
            loadChildren: () =>
              import('./admin-user-create/admin-user-create.module').then((m) => m.AdminUserCreateModule),
          },
          {
            path: ':userId',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./admin-user-detail/admin-user-detail.module').then((m) => m.AdminUserDetailModule),
              },
              {
                path: 'edit',
                loadChildren: () =>
                  import('./admin-user-edit/admin-user-edit.module').then((m) => m.AdminUserEditModule),
              },
              {
                path: 'password',
                loadChildren: () =>
                  import('./admin-user-password/admin-user-password.module').then((m) => m.AdminUserPasswordModule),
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class AdminUserFeatureModule {}
