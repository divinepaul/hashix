const crypto = require('crypto');
const fs = require('fs')
const archiver = require('archiver');
const path = require('path');


class cipherEncryption {

    constructor() {
        this.password = null;
        this.algorithm = null;
        this.files = null;
        this.key = null;
        this.buffer = 16;
        this.vector = 0;
        this.input = null;
        this.output = null;
        this.iv = null;
        this.hash = null;
        this.salt = null;

        this.archive = archiver('zip', {
            zlib: {
                level: 9
            }
        });

    }

    setFiles(files) {
        this.files = files;

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
        if (fs.existsSync(checkDir)) {
            console.log("Folder Exist");
        } else {
            fs.mkdir('zipDir/', (err) => {
                if (err) throw err;
            })
        }
    }

    //Function To zip the Files 
    zipFiles() {

        var output = fs.createWriteStream(__dirname + '/zipDir/file.zip');

        this.archive.pipe(output);

        // looping through every path in this.files
        this.files.forEach((file) => {
            // getting the status of each path.
            let stats = fs.lstatSync(file);
            // checks if the path is a file
            if (stats.isFile()) {
                // if it's a file append it to the archive
                this.archive.append(fs.createReadStream(file),{name:path.basename(file)});

            }
            // checks if the path is a directory
            if(stats.isDirectory()){
                // add the folder to the archive
                this.archive.directory(file,path.basename(file));
            }
            
        })

        this.archive.finalize();
    }

    

    encryptFiles() {

        this.iv = crypto.randomBytes(16);
        this.salt = this.password;
        this.hash = crypto.createHash("sha256");

        this.hash.update(this.salt);

// `hash.digest()` returns a Buffer by default when no encoding is given
        this.key = this.hash.digest().slice(0, 32);

        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        this.input = fs.createReadStream('zipDir/file.zip'); //Zipped Files get Encrypted
        this.output = fs.createWriteStream('file.enc');  //Create Encryped Zip Files
        this.input.pipe(cipher).pipe(this.output);

    }

    //Remove the zip file after encryption
    rmZip() {
        fs.unlinkSync('zipDir/file.zip');
    }

    decryptFiles() {

        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv)
        this.input = fs.createReadStream('file.enc');
        this.output = fs.createWriteStream('decrypt.txt');
        this.input.pipe(decipher).pipe(this.output);

    }
}

const stream = new cipherEncryption();


// sets file paths using the method.
stream.setFiles([
    "file2.txt",
    "file3.txt",
    "./subdir"
]);
stream.setPassword('paulprince');
stream.setAlgorithm('aes-256-cbc');

stream.checkFolder();
stream.zipFiles();
stream.encryptFiles();
//stream.decryptFiles();





