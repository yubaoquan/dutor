import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

console.info(`test start`);

// wrap the normal storage with the encryption plugin
const encryptedDexieStorage = wrappedKeyEncryptionCryptoJsStorage({
  storage: getRxStorageDexie(),
});

// create an encrypted database
const db = await createRxDatabase({
  name: 'mydatabase',
  storage: encryptedDexieStorage,
  password: 'sudoLetMeIn',
});

const schema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    secret: {
      type: 'string',
    },
  },
  required: ['id'],
  encrypted: ['secret'],
};

await db.addCollections({
  myDocuments: {
    schema,
  },
});

console.info(`done`);

export default 'abc';
