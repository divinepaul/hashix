const crypto = window.require('crypto');
const fs = window.require('fs')
const archiver = window.require('archiver');
const path = window.require('path');
const unzipper = window.require('unzipper');

export default class cipherEncryption {

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
    zipFiles(savePath) {

        var output = fs.createWriteStream('zipDir/file.zip');

        this.archive.pipe(output);

        // looping through every path in this.files
        this.files.forEach((file) => {
            // getting the status of each path.
            let stats = fs.lstatSync(file);
            // checks if the path is a file
            if (stats.isFile()) {
                // if it's a file append it to the archive
                this.archive.append(fs.createReadStream(file), { name: path.basename(file) });

            }
            // checks if the path is a directory
            if (stats.isDirectory()) {
                // add the folder to the archive
                this.archive.directory(file, path.basename(file));
            }

        })

        this.archive.finalize();

        return output;

    }

    unZipFiles(savePath){
        let input = fs.createReadStream('zipDir/file.zip');
        let output = input.pipe(unzipper.Extract({ path: savePath }));
        return output;
    }



    encryptFiles(savePath) {

        let key = this.password
        var cipher = crypto.createCipher('aes-256-cbc', key);
        this.input = fs.createReadStream('zipDir/file.zip');
        this.output = fs.createWriteStream(savePath);
        this.input.pipe(cipher).pipe(this.output);
        return this.output;
    }

    //Remove the zip file after encryption
    rmZip() {
        fs.unlinkSync('zipDir/file.zip');
    }

    decryptFiles() {

        let key = this.password
        var cipher = crypto.createDecipher('aes-256-cbc', key);
        this.input = fs.createReadStream(this.files);
        this.output = fs.createWriteStream('zipDir/file.zip');
        this.input.pipe(cipher).pipe(this.output);
        return {inputStream: this.input,cipherStream: cipher,outputStream: this.output}


    }
}

