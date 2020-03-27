const crypto = require('crypto');
const fs = require('fs')
const zlib = require('zlib');

class cipherEncryption {

    constructor() {
        this.password  = null;
        this.algorithm = null;
        this.files     = null;
    }

    setFiles(files) {
        this.files = files;
        console.log(files);

    }

    setPassword(password) {
        this.password = password;        

    }
    setAlgorithm(algorithm) {
        this.algorithm = algorithm;

    }
    encryptFiles(){
        const key = crypto.scryptSync(this.password,'salt',24);
        const buffer = 16;
        const vector = 0;
        const iv = Buffer.alloc(buffer,vector);
        const cipher = crypto.createCipheriv(this.algorithm,key,iv);
        const input = fs.createReadStream(this.files[0]);
        const output = fs.createWriteStream('file.enc');
        input.pipe(cipher).pipe(output);

    }
    decryptFiles(){

    }
}

const stream = new cipherEncryption();
stream.setFiles([
    "file.txt"
])
stream.setPassword('password');
stream.setAlgorithm('aes-192-cbc')
stream.encryptFiles();




