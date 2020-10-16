import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AUTH_FEATURE_KEY, AuthPartialState, State } from './auth.reducer'

export const getAuthState = createFeatureSelector<AuthPartialState, State>(AUTH_FEATURE_KEY)

export const getAuthUser = createSelector(getAuthState, (state: State) => state.user)

export const getAuthToken = createSelector(getAuthState, (state: State) => state.token)

export const getAuthError = createSelector(getAuthState, (state: State) => state.error)
