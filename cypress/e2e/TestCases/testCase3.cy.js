

import dataConnectors from "../../support/pageObjects/dataConnectorsPage";
import homepage from "../../support/pageObjects/homepage";

let data;

describe("Test Case 3", ()=>{


    beforeEach("Navigate to Promethium Homepage", ()=>{
        
        cy.visit("https://www.pm61data.com/");
        
    })

    before(function(){
        cy.fixture('example.json').then((userFixture) => {
                data = userFixture;
        })
           
    })

    it("Validate Images for /promethium-data-connectors",()=>{

       
        //cy.get("#comp-jwtopy710").focus();
        homepage.productDropdown.click()

            
        // 17 images 

        dataConnectors.databaseImages.each(($el, index, list)=>{
            
            cy.wrap($el)
            .should('have.attr', 'src')
            .should('include', data.database[index])
         }).then((list)=>{
            expect(list).to.have.length(17)  
        })

        // two ways to validate loop through all texts and check
        // or check each individually
        

        dataConnectors.microsoftSQLServerText.should('have.text', 'Microsoft SQL Server');
        dataConnectors.sqlText.should('have.text', 'MySQL');
        dataConnectors.postgreSQLText.should('have.text', 'PostgreSQL');
        dataConnectors.teradataText.should('have.text', 'Teradata');
    })



})