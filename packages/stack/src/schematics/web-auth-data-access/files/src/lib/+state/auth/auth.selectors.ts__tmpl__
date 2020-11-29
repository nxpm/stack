import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AUTH_FEATURE_KEY, AuthPartialState, State } from './auth.reducer'

export const getAuthState = createFeatureSelector<AuthPartialState, State>(AUTH_FEATURE_KEY)

export const getAuthError = createSelector(getAuthState, (state: State) => state.error)

export const getAuthUser = createSelector(getAuthState, (state: State) => state.user)

export const isLoggedIn = createSelector(getAuthState, (state: State) => !!state.user)
