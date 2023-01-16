
class dataConnectors {

        

        get databaseImages(){
            return cy.get('#comp-ktbxs380 > div > div > .MazNVa > div > wix-image > img');
        }

        get microsoftSQLServerText(){
            return cy.get('#comp-ktbxs3ey1 > .font_7 > span');
        }
        get sqlText(){
            return cy.get('#comp-ktbxs3f6 > .font_7 > span');
        }
        get postgreSQLText(){
            return cy.get('#comp-ktbxs3fp > .font_7 > span');
        }
        get teradataText(){
            return cy.get('#comp-ktbyhcjl > .font_7 > span');
        }

    }

    export default dataConnectors = new dataConnectors();
    


