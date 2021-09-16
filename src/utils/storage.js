import { encrypt, decrypt } from './jsencrypt';

export default class Storage {
  constructor(prop) {
    this.storage = prop.storage;
  }

  get(key) {
    const value = JSON.parse(this.storage.getItem(key));
    if (value?.option) {
      const { timeout, isEncrypt } = value.option;
      delete value.option;
      if (timeout) {
        const date = new Date().getTime();
        if (date >= timeout) this.remove(key);
      } else if (isEncrypt) {
        const keys = Object.keys(value);
        keys.forEach((k) => {
          value[k] = decrypt(value[k]);
        });
      }
    }
    return value;
  }

  set(key, value, option) {
    if (option?.isEncrypt) {
      const keys = Object.keys(value);
      keys.forEach((k) => {
        value[k] = encrypt(String(value[k]));
      });
    }
    this.storage.setItem(key, JSON.stringify({ ...value, option }));
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}
