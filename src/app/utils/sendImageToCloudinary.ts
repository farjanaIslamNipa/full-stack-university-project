import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


export const sendImageToCloudinary = (imageName:string, path: string) => {       
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName }, 
      function(error, result) {
        if(error){
          reject(error)
        }
        resolve(result)
        
        // delete local file from upload folder
        fs.unlink(path, (err) => {
          if(err){
            reject(err);
          }else{
            console.log('file deleted')
          }
        })
      });

  })


}
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })