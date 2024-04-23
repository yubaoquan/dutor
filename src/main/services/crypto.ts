import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const getIV = (secret, digits) =>
  crypto.createHash('sha256').update(String(secret)).digest('base64').slice(0, digits);

const ALGORITHM = 'aes-256-ctr';

export const processFile = (filePath, secret, isEncrypt) => {
  const createType = isEncrypt ? 'createCipheriv' : 'createDecipheriv';
  const cipher = crypto[createType](ALGORITHM, getIV(secret, 32), getIV(secret, 16));
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(
    path.join(path.dirname(filePath), isEncrypt ? 'encrypted.jpg' : 'decrypted.jpg'),
  );

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    console.log(`${isEncrypt ? 'Encrypted' : 'Decrypted'} file written to disk!`);
  });
};

// processFile('./ator2.jpg', 'your_secret', true)
processFile('./encrypted.jpg', 'your_secret', false);
