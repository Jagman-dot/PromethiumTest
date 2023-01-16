import homepage from "../../support/pageObjects/homepage";

describe("Test Case 1", ()=>{


    beforeEach("Navigate to Promethium Homepage", ()=>{
        cy.visit("https://www.pm61data.com/");
    })

    it("Validate Promethium logo ",()=>{

        /*
            Locate the Promethium logo, and validate src attribute is present
            Compare the img src url
            Validate alt is "Promehtium Black New Logo"
            Validate logo is displayed
        */
            const expectedSrc = "https://static.wixstatic.com/media/14385e_f40fb165e8e64b8c903dfa4756e304c5~mv2.png/v1/fill/w_174,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Promehtium%20Black%20New%20Logo.png";
            homepage.promethiumLogo.should('have.attr', 'src');
            homepage.promethiumLogo.invoke('attr', 'src').should('eq', expectedSrc);
            homepage.promethiumLogo.should('be.visible');
    })

    it("Validate Text", ()=>{

        homepage.PromethiumCollaborativeText.should("have.text", "Promethium Collaborative Data Analytics");
        homepage.neverMissText.should("have.text", "Never miss an opportunity.");

    })


})