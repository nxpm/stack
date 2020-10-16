import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { getAuthUser } from '../+state/auth/auth.selectors'

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getAuthUser).pipe(
      map((user) => {
        if (!user) {
          console.log('You are not logged in!')
          return this.router.parseUrl('/login')
        }
        console.log('You are logged in as', user.username)
        return true
      }),
    )
  }
}
