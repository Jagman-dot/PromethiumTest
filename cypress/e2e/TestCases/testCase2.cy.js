

describe("Test Case 2", ()=>{


    beforeEach("Navigate to Promethium Homepage", ()=>{
        cy.visit("https://www.pm61data.com/");
        cy.get('.comp-jixneksf > a').invoke('removeAttr', 'target').click()
        
    
    })

    it("Validate required fields ",()=>{

        /*
        - Method 1 
           Click on try now
           Click on Sign up button
           loop through the text field
           Validate required is displayed -- _____ required

           method 2
           validate each individual text field
        */

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

    //results in 409 - conflict as user already exists need to figure out way to make test dynamic
    it("Validate signup process", ()=>{


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

    }, registerpage)

})