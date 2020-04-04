const multer = require('multer');
const path = require('path');
const fs = require('fs');

function uploader(){
  directoryProcessing();
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './server/assets/profile');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + '---' + file.originalname);
    }
  });
  return upload = multer({ storage: storage, limits: { fileSize: 1024*1024*5 }});
}


function directoryProcessing() {
        // ----------------------create directory -----------------
      fs.mkdir(path.join(__dirname, 'server/assets/profile'), { recursive: true } , (err) => {
        if(err){
          console.log(err);
        } else {
          console.log('directory created!!');
        }

      });

      // fs.readdir('./server/assets/profile', (err, files) =>{
      //   console.log('----------length----------');
      //   console.log(files.length);
      //   if(err) {
      //     console.log(err);
      //   } else {
      //     console.log(`only latest three profile imaages uploaded, rest of deleted`);
      //     files.forEach((fileName, index ) => {
      //       const dates = fileName.split('---');
      //       if(index < (files.length - 3) ){
      //         console.log(Date.parse(dates[0]));
      //         fs.unlink('./server/assets/profile/'+fileName, err => {
      //          if(err) console.log(err);
      //          else {
      //                 console.log(`----- overflow profile images deleted------------ \n filename: ${fileName} \n uploaded at date: ${dates[0]} \n -----------------`);

      //          }
      //         });
      //       }
      //     });
      //   }
      // } );
}


module.exports = uploader();
