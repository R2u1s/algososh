import {ColorTest} from "../../src/types/element-states";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays"

describe('Корректная работа страницы "Последовательности Фибоначчи', function () {
  beforeEach(function () {
    cy.visit('/fibonacci');
  });

  it('Пустой инпут дизейблит кнопку', () => {
    cy.get('input').should('be.empty');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('Корректная анимация генерации последовательности Фибоначчи', () => {
    const res = [
      [{value:'1',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default},{value:'3',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default},{value:'3',color:ColorTest.Default},{value:'5',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default},{value:'3',color:ColorTest.Default},{value:'5',color:ColorTest.Default},{value:'8',color:ColorTest.Default}]
    ]

    cy.get('input').type('5');
    cy.get('button[type=submit]').click();

    for(let iteration = 0;iteration<res.length;iteration++){
      cy.get('[class^="circle_content"]').as('circle_content');
      cy.get('@circle_content').each(($circle_content,index)=>{
        cy.get($circle_content).find('[class^="circle_circle"]').as('circle');
        cy.get($circle_content).find('[class*="circle_index"]').first().as('circle_index');
        cy.get('@circle').should('have.text',res[iteration][index].value); //проверяем значение буквы в круге
        cy.get('@circle').should('have.css', 'border', res[iteration][index].color); //проверяем цвет круга
        cy.get('@circle_index').should('have.text',index); //проверяем значение индекса
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
  });
});