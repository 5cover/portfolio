const dataJsonCache = new Map();

function mapCoalesce(map, key, getValue) {
    let val = map.get(key);
    if (val === undefined) {
        val = getValue(key);
        map.set(key, val);
    }
    return val;
}

export async function getDataJson(name) {
    return mapCoalesce(dataJsonCache, name, fetchDataJson);

    async function fetchDataJson(name) {
        try {
            return await (await fetch(`/portfolio/data/${name}.json`)).json();
        } catch (err) {
            throw err;
        }
    }
}

export function map(value, transform, fallback) {
    return value ? transform(value) : fallback;
}

/**
 * @param {string} str 
 * @returns {string}
 */
export function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @template T
 * @param {ArrayLike<T>} iter 
 * @return {T}
 */
export function single(iter) {
    if (iter.length === 1) {
        return iter[0];
    }
    throw `expected 1 item, got ${iter.length}`;
}