const crypto = require('crypto');

class encryptService {
    constructor() {
        this.algorithm = 'aes-192-cbc';
        this.password  = 'password';
    }

    createKey() {
        const key = crypto.scryptSync(this.password,'salt',24);
        const buffer = 16;
        const vector = 0;
        const iv = Buffer.alloc(buffer,vector);
        const cipher = crypto.createCipheriv(this.algorithm,key,iv);
        let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log(encrypted);
    }
}

const start = new encryptService();
start.createKey();