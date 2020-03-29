const crypto = require('crypto');
const fs = require('fs')
const archiver = require('archiver');
const path = require('path');


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
        this.archive = archiver('zip', {
            zlib: {
                level: 9
            }
        });
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

    //Function To zip the Files 
    zipFiles() {

        var output = fs.createWriteStream(__dirname + '/zipDir/file.zip');

        this.archive.pipe(output);
        var Files = ([
            "file2.txt",
            "file2.txt"
        ])
        
        //Adding File Paths into Array
        var i;
        for(i = 0;i<Files.length;i++) {
            this.archive.append(fs.createReadStream(Files[i]), {
                name: path.basename(Files[i])
            });
        }
        this.archive.finalize(); 
    }

    //Function To zip the Folder
    zipFolder() {
        var output1 = fs.createWriteStream(__dirname + '/zipDir/folder.zip');

        this.archive.pipe(output1);
        var Folders = ([
            "subdir/data"
        ])

        //Adding Folder Paths into Array
        var j;
        for(j=0;j<Folders.length;j++)
        {
            this.archive.directory(Folders[j]);
        }
        this.archive.finalize();

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
//stream.decryptFiles();





