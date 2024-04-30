export function Get(name, ini) {
    let data = localStorage.getItem(name);

    if (data !== null) {
        return JSON.parse(data);
    } else {
        localStorage.setItem(name, JSON.stringify(ini));
        return JSON.parse(localStorage.getItem(name));
    }
}

export function Set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
    return JSON.parse(localStorage.getItem(name));
}
