const { defineConfig } = require('cypress')
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
const fs = require("fs");
const pdf = require('pdf-parse');

const pdfReader = async (pdfLocation) => {
  const pdfPathname = pdfLocation
  let dataBuffer = fs.readFileSync(pdfPathname);
  return await pdf(dataBuffer)
}
module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {      
         on('task', {downloadFile, pdf(pdfName){
          return pdfReader(pdfName)
         }})
      
      },
      
      downloadsFolder: "cypress/downloads",
      trashAssetsBeforeRuns: true
      
    }
  })