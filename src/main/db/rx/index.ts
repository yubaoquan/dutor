import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';

// for dev mode
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

addRxPlugin(RxDBDevModePlugin);

const DB_ENCRYPT_KEY = 'dutor-dutor-db';

// wrap the normal storage with the encryption plugin
const encryptedDexieStorage = wrappedKeyEncryptionCryptoJsStorage({
  storage: getRxStorageDexie(),
});

// create database
export const db = await createRxDatabase({
  name: 'dutor',
  storage: encryptedDexieStorage,
  password: DB_ENCRYPT_KEY,
});

console.info(`here`);
