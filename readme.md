## Test 1

### Validating Promethium logo

We make sure the `<img>` has a `src` attribute, the `src` has the right url to and logo is visble.

``` js
homepage.promethiumLogo.should('have.attr', 'src');
homepage.promethiumLogo.invoke('attr', 'src').should('eq', expectedSrc);
homepage.promethiumLogo.should('be.visible');
```

### Validating text

Assert on the element to have the validation text.

``` js
homepage.PromethiumCollaborativeText.should("have.text", "Promethium Collaborative Data Analytics");
homepage.neverMissText.should("have.text", "Never miss an opportunity.");
```

## Test 2

### Validating the required text is displayed if the user submits empty form

There is set up required for this test. Clicking on the Try Now button opens the webpage in another tab. In the `beforeEach()` method we remove the target
attribute before clicking. [As Cypress doesn't support handling tabs.](https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-test-anchor-links-that-open-in-a-new-tab)

We click on the Sign Up button with empty form, and then required texts as a list, and loop through them to validate each item in the list contains required.

``` js
 cy.origin('https://onboarding.pm61data.cloud/user/register', () =>{
            cy.contains('Sign Up').click();
        
            /*
                grab all of the error text, validate there are 5 of them
                and the text required is present
            */
                cy.get('.ant-form-item-explain-error').each(($el, index, $list) =>{
                    expect($el).to.contain("required")
                    cy.log($el.text())
                })
           })
    })
 ```
 
### User is able to fill out the form, clicks on the Sign Up button, Sign up button has loading icon, and Home button has URL with "/user/confirmation?email="

We use origin() method as the URL is changed from the intial cy.visit.

Currently this is resulting in a 409 error, conflict as user already exists need to figure out way to make test dynamic. After running this test for the first time I would execute a clean up method that Deletes the user from our database.

``` js
 cy.origin('https://onboarding.pm61data.cloud/user/register', () =>{
            
                cy.get("#UserRegister_root_user").type("jagman.dhaliwal@pm61data.com");
                cy.get("#UserRegister_first_name").type("jagman");
                cy.get("#UserRegister_last_name").type("dhaliwal");
                cy.get("#UserRegister_company_name").type("Pro");
                cy.get("#UserRegister_job_function").click();
                cy.get('#UserRegister_job_function').invoke('removeAttr', 'readonly').type('{Enter}');
                cy.contains('Sign Up').click();
           })

           cy.origin("https://onboarding.pm61data.cloud/user/confirmation?email=jagman.dhaliwal@pm61data.com&subdomain=jagman-dhaliwal-pm61data.pm61data.cloud", ()=>{

            cy.get(".ant-btn-loading-icon").should('be.visible');
                cy.get(".title___30mpn").should('eq', 'Thank you for signing up.');
                
                //validate Home page has the right href
                cy.get('.ant-btn.ant-btn-primary')
                    .should('be.visible')
                    .invoke('attr','href')
                    .should('eq', 'https://jagman-dhaliwal-pm61data.pm61data.cloud');


                expect(cy.url()).to.contain("/user/confirmation?email=");    

           })
```
 
## Test Case 3

### Navigating to '/promethium-data-connectors' and under the database validate 17 images should appear. Verify that texts include Micosoft SQL Server, MySQL, POstgreSQL, and TeraData

After Navigating to the Data-Connectors, we validate the url.

The database div has about 35 elements, 17 for images and 17 for the assoicated text, and the 35th is the database title. I created a selectors that only selects the 17 images on the left as a list.

We loop through all of the img tags and make sure they have src attribute. I also created a fixture for further validation. In `fixtures/example.json` I have an array of logo with the file extension. So as we are looping through element we are validating the src attribute includes the following file. After looping through all of the files we make sure the list length is 17. If the list > 17 then it have failed in the loop section as our data.database is 17, and $el would have been > 17.

At the bottom of the it function we validate the Micosoft SQL Server, MySQL, POstgreSQL, and TeraData.
``` js
 it("Validate Images for /promethium-data-connectors",()=>{

       
        //cy.get("#comp-jwtopy710").focus();
        homepage.productDropdown.click()

        cy.url().should('contain', '/promethium-data-connectors');
            
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

``` 

## Test Case 4

### Download PDF file, validate number of pages and text

Here is code that downloads and verifies the download. The downloadFile is not part of cypress but coming from an external npm package "cypress-downloadfile", after installing we have to add it to our custom commands and also our cypress.config.js as this `on('task', {downloadFile})`

``` js
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


    it("Read PDF file",()=>{

        //cy.task('pdf', "/Users/jagmandeepdhaliwal/Desktop/promethium/cypress/downloads/solutiondbt.pdf")
        cy.pdfReader();
        

    })
    
```    
    
As for Validating the content and number of pages in the PDF, I found a npm package that can help with this `pdf-parse`. I added a custom command pdfReader which executes test.js file with reading pdf functionality leveraged from pdf-parse. cy.exec yields results and in results.stdout is where we have pdf realted information ex: number of pages, and text from the pdf. We are able to log this in cypress window. However, when asserting using epxect or cy().should we are getting undefined.

``` js
Cypress.Commands.add('pdfReader', () =>{

    let data;
    cy.exec('node test.js').then((result)=>{
       return result.stdout;
    })
```
