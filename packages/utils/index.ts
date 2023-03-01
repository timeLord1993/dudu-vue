
export const isDef = (value: any):boolean => {
    return value !== undefined && value !== null
}

export const isUnDef = (value: any):boolean => {
    return value === undefined && value === null
}

export const isArray = (value: any):boolean => {
    return Array.isArray(value) && value.length
}