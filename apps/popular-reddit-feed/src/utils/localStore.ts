export function setItemWithExpiry(key: string, value: any, maxAge = 30 * 60 * 60 * 1000) {
    // store the value as the object
    // along with the expiry date
    let result = {
        data: value,
        expireTime: new Date().getTime()
    }


    if (maxAge) {
        // set the expiry 
        // from the current date
        result.expireTime = Date.now() + maxAge;
    }

    // stringify the result
    // and the data in original storage
    window.localStorage.setItem(key, JSON.stringify(result));
}

export function getUnExpiredItem(key: string) {
    // get the parsed value of the given key
    let localStoreItem = localStorage.getItem(key)
    if (!localStoreItem) {
        return undefined
    }
    let result = JSON.parse(localStoreItem);

    // if the key has value
    if (result) {

        // if the entry is expired
        // remove the entry and return null
        if (result.expireTime <= Date.now()) {
            window.localStorage.removeItem(key);
            return undefined;
        }

        // else return the value
        return result.data;
    }

    // if the key does not have value
    return undefined;
}

const localStore = {
    setItemWithExpiry,
    getUnExpiredItem
}
export default localStore;