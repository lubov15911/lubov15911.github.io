function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function removeNumProperties(object) {
    for (let key in object) {
        isNumeric(key) && delete object[key];
    }
    return object;
}

function getCleanedObject(object) {
    if (typeof object !== 'object') {
        return;
    }

    return Array.isArray(object) ? object.map(element => {
        return getCleanedObject(element);
    }) : removeNumProperties(object);
}

module.exports = function (source) {
    if (this.cacheable) this.cacheable();

    let value = typeof source === "string" ? JSON.parse(source) : source;

    value = JSON.stringify(getCleanedObject(value))
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    return `module.exports = ${value}`;
};
