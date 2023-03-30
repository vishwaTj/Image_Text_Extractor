const tesseract = require("node-tesseract-ocr")

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}



// function to render the homepage
module.exports.Home = function(req,res){
    let DataObject = {
      name:'Waiting for the upload',
      father_name:'Waiting for the upload',
      PaN_no:'Waiting for the upload'
    }
    return res.render('home',{
        message:``,
        list:DataObject
    });
}

module.exports.fileupload = function(req,res){
    console.log("Hello");

    // checking if file got uploaded
    if(req.files){
        var file = req.files.file;
        var filename = file.name;
      
       // moving the uploaded to file to a specified folder("uploads!!!") 
        file.mv('./uploads/'+filename,function(err){
            if(err){
                res.render('home',{
                    message:`Error in uploading ${err}`
                })}
            else{
              console.log(`file uploaded : ${filename}`); 
               //use tesseract to recognize the image and its contents
                tesseract
                .recognize(`C:/Users/vishw/OneDrive/Desktop/Ecommerce/Company_projects/Image_scanner_and text_reader/uploads/${filename}`, config)
                .then((text) => {
                  console.log("Result:", text)

                  // split the text read into lines
                  let arr = text.split("\n");

                  //store the data in an object format
                  let DataObject = {
                    name:arr[4].substring(0,arr[4].length-1),
                    father_name:arr[6].substring(0,arr[6].length-1),
                    PaN_no:arr[14].substring(0,arr[14].length-3)
                  }
                  console.log("Result:", DataObject)
                  //render the page
                  res.render('home',{
                    message:`file read successful : ${filename}`,
                    list:DataObject
                  });
                })
                .catch((error) => { //Detect Error
                  // send an error Object if tit wrong
                  let DataObject = {
                    name:'Error',
                    father_name:'Error',
                    PaN_no:'Error'
                  }
                  res.render('home',{
                    message:`There was an error in reading your file  : ${filename}`,
                    list:DataObject
                  });
                  console.log(error.message)
                })
            }     
        })
    }
}

