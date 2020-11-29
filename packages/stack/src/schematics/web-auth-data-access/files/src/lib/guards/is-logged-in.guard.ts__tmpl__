import { Injectable } from '@angular/core'
import { CanActivate, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, switchMap, take, tap } from 'rxjs/operators'
import { ensureLogin } from '../+state/auth/auth.actions'
import { isLoggedIn } from '../+state/auth/auth.selectors'

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  ensureLogin(): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(ensureLogin())
        }
      }),
      filter((loggedIn) => !loggedIn),
      take(1),
    )
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      filter((loggedIn) => {
        return !!loggedIn
      }),
      take(1),
    )
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ensureLogin().pipe(switchMap(() => this.isLoggedIn()))
  }
}
