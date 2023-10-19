export function objectsEqual(o1, o2){
    if (!o1 && !o2)
        return true;

    if (!o1 || !o2)
        return false;

    return typeof o1 === 'object' && Object.keys(o1).length > 0 ?
                Object.keys(o1).length === Object.keys(o2).length
                &&
                Object.keys(o1).every(key => objectsEqual(o1[key], o2[key]))
            : o1 === o2;
}

export function isEmpty(val){
    return !val || val === '';
}