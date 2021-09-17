/* eslint-disable max-len */
import JSEncrypt from 'jsencrypt';

const jsencrypt = new JSEncrypt();

const publicKey = '-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHrGTLr7D2HtlDRz3bTYhYOY2AAAyD3jQeJz92n/dbogeJOX0z+xoiH5Lbd9CaLpNOdu7KsS6vg/1OMResiasg6ez1UOKnoJhuAM1yVVzJ4VI6UgedxWnhWue13gN036m3pI58PV5rGHaPxLs1FwqHmrQIbeV4kuKPujSbsHxStjAgMBAAE=-----END PUBLIC KEY-----';

const privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgHrGTLr7D2HtlDRz3bTYhYOY2AAAyD3jQeJz92n/dbogeJOX0z+xoiH5Lbd9CaLpNOdu7KsS6vg/1OMResiasg6ez1UOKnoJhuAM1yVVzJ4VI6UgedxWnhWue13gN036m3pI58PV5rGHaPxLs1FwqHmrQIbeV4kuKPujSbsHxStjAgMBAAECgYBUooKemxedkGOMTRtW4bQYZbLxPZjMYO84Jm02Wu5TIrM8O3ta+x8jgFytkrqj3VOk/uiTffUQsSAWcCROSaXYTd7382u4apbnjojalEG3KvwRD/6CNwp79tUwHszbffoyo0O62RfaSDVUEE/PY6IQVBMmmC8vWodcFZqhJ/B18QJBALJx/S6nPvTuYufnyofv95wLk/K+OZ1HlSV6UxiNRbh9aUVwhJBY8SjIjhJdLfe2gfvDofTb83Dv1zSF7HQfpyUCQQCwIlVmeoREUpM2dBGNkYQeb0vqvw6X8nL5N2afSmodEmDyqC6kP3SkfDV7X9GPoCHsMKo72hToZdA2SeqwySXnAkAV8tlebKncvJmjxqntsIF3SyFGgUla5BwfQP2Jjo7d02coaF+V1arMBmcbMSTfTC6OxhBcqtU1tfp1dmeQHPiVAkEApvxWBOtAvNmgse6GubXtEUGpMuxh9JKqiDYK+Bf/1IIZIdVrKtLyTgNoXQhx0H4byyY0LrxKOC5WoTGg7Gw3nwJBAJ+3OEKkBlR2hVmp0X9vEJ5v6Xx1YJn9KoAzIhuIXbLQF8SJJvt2rNutxwqaWnaxyQEfQHLuPmIUkYqXv15oxxo=-----END RSA PRIVATE KEY-----';

export function encrypt(str) {
  jsencrypt.setPublicKey(publicKey);
  return jsencrypt.encrypt(str);
}

export function decrypt(str) {
  jsencrypt.setPublicKey(privateKey);
  return jsencrypt.decrypt(str);
}
