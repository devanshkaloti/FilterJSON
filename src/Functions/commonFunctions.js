// Get all of the keys: value pair in entire object even with nested entries
export const flattenObject = (obj) => {
    const flattened = {}
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]))
        } else {
            flattened[key] = obj[key]
        }
    })

    return flattened
}
