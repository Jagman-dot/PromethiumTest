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

We use origin() method has the URL 

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
 
 
 
