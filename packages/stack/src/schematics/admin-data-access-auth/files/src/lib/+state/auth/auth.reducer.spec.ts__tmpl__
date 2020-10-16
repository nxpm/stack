import * as AuthActions from './auth.actions'
import { initialState, reducer, State } from './auth.reducer'

describe('Auth Reducer', () => {
  beforeEach(() => {})

  describe('valid Auth actions', () => {
    it('loginSuccess should set the user and token', () => {
      const action = AuthActions.loginSuccess({ data: { user: { id: 'test' }, token: 'test-token' } })

      const result: State = reducer(initialState, action)

      expect(result.token).toEqual('test-token')
      expect(result.user.id).toBe('test')
    })
  })

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any

      const result = reducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
