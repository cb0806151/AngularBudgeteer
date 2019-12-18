describe('Test category functionality', () => {

  it('create a new category', () => {
      cy.visit('https://cb0806151.github.io/AngularBudgeteer/')
      cy.get('.budget_app_input').eq(0).type('Food')
      cy.get('.budget_app_input_btn').eq(0).click()
      cy.get('.budget_app_input').eq(1).should('have.attr', 'placeholder', 'Enter a entry for Food here')
  })

})