
export const isDef = (value: any):boolean => {
    return value !== undefined && value !== null
}

export const isUnDef = (value: any):boolean => {
    return value === undefined && value === null
}

export const isArray = (value: any):boolean => {
    return Array.isArray(value) && value.length
}

export const isString = (value: any):boolean => {
    return typeof value === 'string'
}

export const isNumber = (value: any):boolean => {
    return typeof value === 'number'
}