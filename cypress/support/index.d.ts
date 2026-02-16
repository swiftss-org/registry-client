declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select an option in an MUI Select component
         * @example cy.selectMuiOption('#hospital', 'General Hospital')
         */
        selectMuiOption(selector: string, optionText: string): Chainable<Element>;
    }
}
