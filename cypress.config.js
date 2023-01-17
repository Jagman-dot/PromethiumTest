const { defineConfig } = require('cypress')
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
const fs = require("fs");
const path = require('path');
const pdf = require('pdf-parse');



module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {      
         on('task', {downloadFile})
         on('task', {
          pdf({pathToPdf}){

            const pdfPath = path.resolve(pathToPdf)
            let dataBuffer = fs.readFileSync(pdfPath);

            pdf(dataBuffer).then(function(data) {
            
              // number of pages
              console.log(data.numpages);
              // number of rendered pages
              console.log(data.numrender);
              // PDF info
              console.log(data.info);
              // PDF metadata
              console.log(data.metadata); 
              // PDF.js version
              // check https://mozilla.github.io/pdf.js/getting_started/
              console.log(data.version);
              // PDF text
              console.log(data.text); 
                    
            });
          
          }
         })
      
      },
      
      downloadsFolder: "cypress/downloads",
      trashAssetsBeforeRuns: true
      
    }
  })