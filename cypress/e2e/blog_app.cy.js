describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Goty Jr.',
      username: 'gotyjr',
      password: 'gameOfTheYear'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('gotyjr')
      cy.get('#password').type('gameOfTheYear')
      cy.get('#login-button').click()
      cy.contains('Goty Jr. logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('gotyjr')
      cy.get('#password').type('notValid')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain','Goty Jr. logged in')
      cy.get('#notification').should('exist').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'gotyjr', password:'gameOfTheYear'})
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#blog-title').type('Blog de prueba')
      cy.get('#blog-author').type('Maria Antonieta')
      cy.get('#blog-url').type('www.mari.es/maria/combo')
      cy.get('#blog-submit').click()

      cy.contains('Blog de prueba').contains('view')
    })
  })
})