const crypto = require('crypto');
const fs = require('fs')
const archiver = require('archiver');

class cipherEncryption {

    constructor() {
        this.password  = null;
        this.algorithm = null;
        this.files     = null;
        this.key       = null;
        this.buffer    = 16;
        this.vector    = 0;
        this.input     = null;
        this.output    = null;
        this.iv        = null;        
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

    zipFiles() {
        var output = fs.createWriteStream(__dirname + '/file.zip');

        const archive = archiver('zip', {
            zlib: {
                level: 9
            }
        });
        archive.pipe(output);
        var testFiles = ([
            "file1.txt",
            "file2.txt"
        ])
        archive.append(fs.createReadStream(testFiles[0]), {
            name:'file1.txt'
        });
        archive.finalize(); 
    }
    encryptFiles(){
        
        this.key = crypto.scryptSync(this.password,'salt',24);
        this.iv = Buffer.alloc(this.buffer,this.vector);
        const cipher = crypto.createCipheriv(this.algorithm,this.key,this.iv);
        this.input = fs.createReadStream(this.createdZip); //Zipped Files get Encrypted
        this.output = fs.createWriteStream('file.zip.enc');  //Create Encryped Zip Files
        this.input.pipe(cipher).pipe(this.output);

    }
    decryptFiles(){

        const decipher = crypto.createDecipheriv(this.algorithm,this.key,this.iv)
        this.input = fs.createReadStream('file.enc');
        this.output = fs.createWriteStream('decrypt.txt');
        this.input.pipe(decipher).pipe(this.output);

    }
}

const stream = new cipherEncryption();
stream.setFiles([
    "file.zip"
])
stream.setPassword('password');
stream.setAlgorithm('aes-192-cbc')
stream.zipFiles();
//stream.encryptFiles();
//stream.decryptFiles();





