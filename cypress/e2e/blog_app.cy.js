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

    describe('And a blog is created', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'Here is the blog to test',
          author: 'David Glez',
          url: 'oioi.uio/iiuu/popopi'
        })
      })

      it('Users can like a blog', function() {
        cy.contains('Here is the blog to test').get('#view-button').click()
        cy.contains('likes').contains('0')
        cy.get('#like-button').click()
        cy.contains('likes').contains('1')
      })

      it('User who created the blog can delete it', function() {
        cy.contains('Here is the blog to test').get('#view-button').click()
        cy.contains('Here is the blog to test').parent().contains('remove').click()
        cy.get('html').should('not.contain','Here is the blog to test')
      })

      it('Only the creator can see the remove button', function() {
        //New user
        const user2 = {
          name: 'Goty Sr.',
          username: 'gotysr',
          password: 'gameOfAllTheYears'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

        cy.contains('Here is the blog to test').get('#view-button').click()
        cy.contains('remove')

        cy.contains('logout').click()
        cy.login({username: 'gotysr', password:'gameOfAllTheYears'})

        cy.contains('Here is the blog to test').get('#view-button').click()
        cy.contains('Here is the blog to test').should('not.contain', 'remove')
      })

      it.only('Blogs are ordered by the number of likes', function() {
        cy.addBlog({
          title: 'Blog with 1 like',
          author: 'David Glez',
          url: 'oioi.uio/iiuu/popopi1'
        })
        cy.addBlog({
          title: 'Blog with 2 likes',
          author: 'David Glez',
          url: 'oioi.uio/iiuu/popopi2'
        })

        cy.contains('Blog with 1 like').contains('view').click()
        cy.contains('Blog with 2 likes').contains('view').click()
        cy.contains('Blog with 1 like').contains('like').click()
        cy.contains('Blog with 2 likes').contains('like').as('thisButton')
        cy.get('@thisButton').click()
        cy.get('@thisButton').click()

        cy.get('.blog').eq(0).should('contain', 'Blog with 2 likes')
        cy.get('.blog').eq(1).should('contain', 'Blog with 1 like')
        cy.get('.blog').eq(2).should('contain', 'Here is the blog to test')

      })
    })
  })

  
})