import {ColorTest} from "../../src/types/element-states";
import {DELAY_IN_MS} from "../../src/constants/delays"

describe('Корректная работа роутинга', function () {
  beforeEach(function () {
    cy.visit('/recursion');
  });

  it('Пустой инпут дизейблит кнопку', () => {
    cy.get('input').should('be.empty');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('Корректная анимация разворота строки', () => {
    const res = [
      [{value:'a',color:ColorTest.Default},{value:'b',color:ColorTest.Default},{value:'c',color:ColorTest.Default},{value:'d',color:ColorTest.Default}],
      [{value:'a',color:ColorTest.Changing},{value:'b',color:ColorTest.Default},{value:'c',color:ColorTest.Default},{value:'d',color:ColorTest.Changing}],
      [{value:'d',color:ColorTest.Modified},{value:'b',color:ColorTest.Default},{value:'c',color:ColorTest.Default},{value:'a',color:ColorTest.Modified}],
      [{value:'d',color:ColorTest.Modified},{value:'b',color:ColorTest.Changing},{value:'c',color:ColorTest.Changing},{value:'a',color:ColorTest.Modified}],
      [{value:'d',color:ColorTest.Modified},{value:'c',color:ColorTest.Modified},{value:'b',color:ColorTest.Modified},{value:'a',color:ColorTest.Modified}]
    ]

    cy.get('input').type('abcd');
    cy.get('button[type=submit]').click();
    cy.get('[class^="circle_circle"]').should('have.length', 4).as('circle');

    for(let iteration = 0;iteration<res.length;iteration++){
      cy.get('@circle').each(($circle,letter)=>{
        cy.wrap($circle).should('have.text',res[iteration][letter].value); //проверяем значение буквы в круге
        cy.wrap($circle).should('have.css', 'border', res[iteration][letter].color); //проверяем цвет круга
      });
      cy.wait(DELAY_IN_MS);
    }
  });
});