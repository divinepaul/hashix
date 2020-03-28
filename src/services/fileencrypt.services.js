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

    //Check Whether zip folder is Present
    checkFolder() {

        const checkDir = 'zipDir/';
        if(fs.existsSync(checkDir)) {
            console.log("Folder Exist");
        } else {
            fs.mkdir('zipDir/', (err) => {
                if(err) throw err;
            })
        }             
    }

    //Zip the files 
    zipFiles() {

        var output = fs.createWriteStream(__dirname + '/zipDir/file.zip');

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
        
        var i,j;
        for(i = 0;i<testFiles.length;i++) {
            archive.append(fs.createReadStream(testFiles[i]), {
                name:'file1.txt'
            });
        }
        archive.finalize(); 
    }
    encryptFiles() {
        
        this.key = crypto.scryptSync(this.password,'salt',24);
        this.iv = Buffer.alloc(this.buffer,this.vector);
        const cipher = crypto.createCipheriv(this.algorithm,this.key,this.iv);
        this.input = fs.createReadStream('zipDir/file.zip'); //Zipped Files get Encrypted
        this.output = fs.createWriteStream('file.zip.enc');  //Create Encryped Zip Files
        this.input.pipe(cipher).pipe(this.output);

    }

    //Remove the zip file after encryption
    rmZip() {
        fs.unlinkSync('zipDir/file.zip');
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
stream.checkFolder();
stream.zipFiles();
stream.encryptFiles();
//stream.rmZip();
//stream.decryptFiles();





