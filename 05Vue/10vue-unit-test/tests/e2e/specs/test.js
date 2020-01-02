// https://docs.cypress.io/api/introduction/api.html

describe('端到端测试，抢测试人员的饭碗', () => {
    it('先访问一下', () => {
        cy.visit('/')
        cy.contains('h1', 'Welcome to Your Vue.js App') 
        cy.contains('#message', '一开始的message')
        cy.get('button').click()
        cy.contains('#message', '改变后的message')
    })
})