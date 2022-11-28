export function kebabCase(key: string) {
    const result = key.replace(/([A-Z])/g, ' $1').trim()
    return result.split(' ').join('-').toLowerCase()
}

export function firstUpCase(key: string) {
    return key.trim().split('').reduce((pre, cur) => {
        if (!pre) return cur.toUpperCase();
        return pre + cur;
    }, '');
}
