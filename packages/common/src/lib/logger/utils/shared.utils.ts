/* eslint-disable @typescript-eslint/no-use-before-define */
export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined'

export const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object'

export const isPlainObject = (fn: any): fn is object => {
  if (!isObject(fn)) {
    return false
  }
  const proto = Object.getPrototypeOf(fn)
  if (proto === null) {
    return true
  }
  const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  )
}

export const isNil = (obj: any): obj is null | undefined => isUndefined(obj) || obj === null
