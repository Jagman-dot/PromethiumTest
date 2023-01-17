
import homepage from "../../support/pageObjects/homepage";
import resourcePage from "../../support/pageObjects/resourcePage";

let data;


describe("Test Case 4", ()=>{


    beforeEach("Navigate to Promethium Homepage", ()=>{
        
        cy.visit("https://www.pm61data.com/");
        
    })

    before(function(){
        cy.fixture('example.json').then((userFixture) => {
                data = userFixture;
        })
           
    })

    it("Download PDF file",()=>{
        homepage.ResourcesDropdown.click();
        //resourcePage.solutiondbtDownload.click();

        cy.get('#comp-khxrjo87__item-l4epj00h > a').invoke('attr', 'href').then((href)=>{
            cy.downloadFile(href,'cypress/downloads', 'solutiondbt.pdf')
        })

        //verifies pdf has been downloaded 
        // todo need to add trashAssetsBeforeRun to keep downloads folder clean
        cy.readFile('cypress/downloads/solutiondbt.pdf');

        //cy.task('readPdf', 'cypress/downloads/solutiondbt.pdf').should('contain', 'Reimagining data analytics');
    
    })


    it.only("Read PDF file",()=>{

        //cy.task('pdf', "/Users/jagmandeepdhaliwal/Desktop/promethium/cypress/downloads/solutiondbt.pdf")
        cy.pdfReader();
        

    })
 




})