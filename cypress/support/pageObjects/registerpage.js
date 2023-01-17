class registerPage {

        

    get companyEmail(){
        return cy.get("#UserRegister_root_user");
    }

    get firstName(){
        return cy.get("#UserRegister_first_name");
    }

    get lastName(){
        return  cy.get("#UserRegister_last_name");
    }

    get companyName(){
        cy.get("#UserRegister_company_name");
    }

    get jobFunctionDropDown(){ 
        return cy.get("#UserRegister_job_function");
    }

    get signUpButton(){
        return cy.contains('Sign Up');
    }

    get errorMessages(){
        cy.get('.ant-form-item-explain-error');
    }

    get loadingIcon(){
        return cy.get(".ant-btn-loading-icon");
    }

    get thankyouText(){
        return cy.get(".title___30mpn");
    }

    get homeButton(){
        return cy.get('.ant-btn.ant-btn-primary');
    }


}

export default registerpage = new registerPage();