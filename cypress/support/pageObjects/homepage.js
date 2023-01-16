class homepage {

        

    get productDropdown(){
        cy.get('#comp-jwtopy710 > ul').invoke('attr', 'style', 'display:');
        return cy.get('#comp-jwtopy710 > ul > li:nth-child(5)');
    }

    get ResourcesDropdown(){
        cy.get('#comp-jwtopy712 > ul').invoke('attr', 'style', 'display:');
        return cy.get('#comp-jwtopy712 > ul > li:nth-child(2)');
    }

    get tryMeButton() {
        return cy.get('.comp-jixneksf > a');
    }

    get promethiumLogo(){
        return cy.get('#img_comp-jixmod45 > img');
    }

    get neverMissText(){
        return cy.get("#comp-l5u6mahn4 > h3 > span > span > span");
    }
    
    get PromethiumCollaborativeText(){
        return cy.get("h1 > span > span > span");
    }



}

export default homepage = new homepage();