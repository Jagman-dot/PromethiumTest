// const fs = require('fs');
// const pdf = require('pdf-parse');


// let dataBuffer = fs.readFileSync('/Users/jagmandeepdhaliwal/Desktop/promethium/cypress/downloads/solutiondbt.pdf');

// pdf(dataBuffer).then(function(data) {

//   return data.numpages
        
// });


const fs = require("fs");
const path = require('path')
const pdf = require('pdf-parse');

const readPdf = () => {

  return new Promise((resolve) => {
    const pdfPath = path.resolve('/Users/jagmandeepdhaliwal/Desktop/promethium/cypress/downloads/solutiondbt.pdf')
    let dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer).then(function (text ) {
      
      resolve(text)

    });

  })

}
 
readPdf().then((data)=>{
  console.log(data);
})