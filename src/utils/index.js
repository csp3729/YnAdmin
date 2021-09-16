import Storage from './storage';
import { encrypt, decrypt } from './jsencrypt';

export const local = new Storage({ storage: localStorage });

export const session = new Storage({ storage: sessionStorage });

export { encrypt, decrypt };

export default {
  local,
  session,
  encrypt,
  decrypt,
};
