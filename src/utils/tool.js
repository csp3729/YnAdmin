/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import JSEncrypt from 'jsencrypt';

/* 将数据转换成formData，商家旧接口需要用到 */
export function tranForm(obj) {
  const keys = Object.keys(obj);
  const data = new FormData();
  keys.forEach((key) => {
    data.append(key, obj[key]);
  });
  return data;
}

/* 加密 */
export function encryptor(str) {
  const encrypt = new JSEncrypt();
  const key = '-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHrGTLr7D2HtlDRz3bTYhYOY2AAAyD3jQeJz92n/dbogeJOX0z+xoiH5Lbd9CaLpNOdu7KsS6vg/1OMResiasg6ez1UOKnoJhuAM1yVVzJ4VI6UgedxWnhWue13gN036m3pI58PV5rGHaPxLs1FwqHmrQIbeV4kuKPujSbsHxStjAgMBAAE=-----END PUBLIC KEY-----';
  encrypt.setPublicKey(key);
  return encrypt.encrypt(str);
}

/* 解密 */
export function decrypt(val) {
  const decode = new JSEncrypt();
  const key = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgHrGTLr7D2HtlDRz3bTYhYOY2AAAyD3jQeJz92n/dbogeJOX0z+xoiH5Lbd9CaLpNOdu7KsS6vg/1OMResiasg6ez1UOKnoJhuAM1yVVzJ4VI6UgedxWnhWue13gN036m3pI58PV5rGHaPxLs1FwqHmrQIbeV4kuKPujSbsHxStjAgMBAAECgYBUooKemxedkGOMTRtW4bQYZbLxPZjMYO84Jm02Wu5TIrM8O3ta+x8jgFytkrqj3VOk/uiTffUQsSAWcCROSaXYTd7382u4apbnjojalEG3KvwRD/6CNwp79tUwHszbffoyo0O62RfaSDVUEE/PY6IQVBMmmC8vWodcFZqhJ/B18QJBALJx/S6nPvTuYufnyofv95wLk/K+OZ1HlSV6UxiNRbh9aUVwhJBY8SjIjhJdLfe2gfvDofTb83Dv1zSF7HQfpyUCQQCwIlVmeoREUpM2dBGNkYQeb0vqvw6X8nL5N2afSmodEmDyqC6kP3SkfDV7X9GPoCHsMKo72hToZdA2SeqwySXnAkAV8tlebKncvJmjxqntsIF3SyFGgUla5BwfQP2Jjo7d02coaF+V1arMBmcbMSTfTC6OxhBcqtU1tfp1dmeQHPiVAkEApvxWBOtAvNmgse6GubXtEUGpMuxh9JKqiDYK+Bf/1IIZIdVrKtLyTgNoXQhx0H4byyY0LrxKOC5WoTGg7Gw3nwJBAJ+3OEKkBlR2hVmp0X9vEJ5v6Xx1YJn9KoAzIhuIXbLQF8SJJvt2rNutxwqaWnaxyQEfQHLuPmIUkYqXv15oxxo=-----END RSA PRIVATE KEY-----';
  decode.setPrivateKey(key);
  return decode.decrypt(val);
}

/* Storage */
class Storage {
  constructor(prop) {
    this.storage = prop.storage;
  }

  get(key) {
    const value = JSON.parse(this.storage.getItem(key));
    if (value?.option) {
      const { timeout, encrypt } = value.option;
      delete value.option;
      if (timeout) {
        const date = new Date().getTime();
        if (date >= timeout) this.remove(key);
      } else if (encrypt) {
        const keys = Object.keys(value);
        keys.forEach((k) => {
          console.log(decrypt(value[k]));
          value[k] = decrypt(value[k]);
        });
      }
    }
    return value;
  }

  set(key, value, option) {
    if (option?.encrypt) {
      const keys = Object.keys(value);
      keys.forEach((k) => {
        value[k] = encryptor(String(value[k]));
      });
    }
    this.storage.setItem(key, JSON.stringify({ ...value, option }));
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}

const local = new Storage({ storage: localStorage });

const session = new Storage({ storage: sessionStorage });

export { local, session };
