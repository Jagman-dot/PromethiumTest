class resourcePage {

        

    get solutiondbtDownload(){
        cy.get('#comp-khxrjo87__item-l4epj00h > a').invoke('attr', 'download').should('have.attr', 'download')
        return cy.get('#comp-khxrjo87__item-l4epj00h > a').invoke('removeAttr', 'target');
    }
    



}

export default resourcePage = new resourcePage();