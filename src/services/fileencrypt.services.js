const crypto = require('crypto');
const fs = require('fs')
const zlib = require('zlib');

class streamEncrypt {



    checkFiles() {
        const fileContents = fs.readFileSync('./file.txt');
        if(fileContents) {
            console.log("File has been sucessfully loaded");
        } else {
            console.log("File loading failed");
        }
    }

    constructor() {
        this.algorithm = 'aes-192-cbc';
        this.password  = 'password';
        this.files = null
    }

    generateKey() {
        const key = crypto.scryptSync(this.password,'salt',24);
        const buffer = 16;
        const vector = 0;
        const iv = Buffer.alloc(buffer,vector);
        const cipher = crypto.createCipheriv(this.algorithm,key,iv);
        this.generateStream(cipher);
            
    }

    setFiles(files) {
        this.files = files;
        console.log(files);
    }

    generateStream(cip) {

        const input = fs.createReadStream('file.txt');
        const zip = zlib.createGzip();
        const output = fs.createWriteStream('file.enc');
        input.pipe(zip).pipe(cip).pipe(output);

    }
        
}
const stream = new streamEncrypt();
stream.checkFiles();
stream.generateKey();
stream.setFiles([
    "/service/file.enc",
    "/service/fileencrypt.services.js"
]);
