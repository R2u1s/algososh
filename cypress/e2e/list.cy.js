import { ColorTest } from "../../src/types/element-states";
import { DELAY_IN_MS } from "../../src/constants/delays"

export const ButtonTest = {
  AddHead: 'button_add_head',
  AddTail: 'button_add_tail',
  RemoveHead: 'button_remove_head',
  RemoveTail: 'button_remove_tail',
  AddIndex: 'button_add_index',
  RemoveIndex: 'button_remove_index',
};

describe('Корректная работа страницы "Связный список"', function () {
  beforeEach(function () {
    cy.visit('/list');
  });

  it('Пустые инпуты дизейблят кнопки', () => {
    //находим кнопки
    cy.get('button').contains('Добавить в head').parent().as(ButtonTest.AddHead);
    cy.get('button').contains('Добавить в tail').parent().as(ButtonTest.AddTail);
    cy.get('button').contains('Добавить по индексу').parent().as(ButtonTest.AddIndex);
    cy.get('button').contains('Удалить по индексу').parent().as(ButtonTest.RemoveIndex);

    //проверяем кнопки
    cy.get('input[type=text]').should('be.empty');
    cy.get(`@${ButtonTest.AddHead}`).should('be.disabled');
    cy.get(`@${ButtonTest.AddTail}`).should('be.disabled');
    cy.get('input[type=number]').should('be.empty');
    cy.get(`@${ButtonTest.AddIndex}`).should('be.disabled');
    cy.get(`@${ButtonTest.RemoveIndex}`).should('be.disabled');
  });

  //Массив проверяемых действий
  const consequence = [
    //1ый шаг - отрисовка по дефолту
    {
      action: { button: null, value: null },           //действий нет
      animation: [                                              //без анимации
        [{ value: '0', color: ColorTest.Default, head: 'head', tail: '', },
        { value: '34', color: ColorTest.Default, head: '', tail: '' },
        { value: '8', color: ColorTest.Default, head: '', tail: '' },
        { value: '1', color: ColorTest.Default, head: '', tail: 'tail' }],
      ]
    },
    //2ой шаг
    {
      action: { button: ButtonTest.Add, value: '3' },           //добавление элемента со значением 3 в head
      animation: [
        [{ value: '0', color: ColorTest.Default, head: '3', colorHead: ColorTest.Changing, tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '3', color: ColorTest.Modified, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '0', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '3', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '0', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],
      ]
    },
    //3ий шаг
    {
      action: { button: ButtonTest.Add, value: '33' },           //добавление элемента со значением 33 в tail
      animation: [
        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '33', colorHead: ColorTest.Changing, tail: '', colorTail: '' }],

        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '33', color: ColorTest.Modified, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '33', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],
      ]
    },
    //4ый шаг
    {
      action: { button: ButtonTest.Remove, value: null },       //удаление элемента из head
      animation: [
        [{ value: '', color: ColorTest.Default, head: 'head', colorHead: '', tail: '0', colorTail: ColorTest.Changing },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '34', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }]
      ]
    },
    //5ый шаг
    {
      action: { button: ButtonTest.Remove, value: null },       //удаление элемента из tail
      animation: [
        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '', color: ColorTest.Default, head: '', colorHead: '', tail: '1', colorTail: ColorTest.Changing }],

        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' },]
      ]
    },
    //6ой шаг
    {
      action: { button: ButtonTest.Remove, value: '21' },       //добавление элемента по индексу
      animation: [
        [{ value: '0', color: ColorTest.Default, head: '21', colorHead: ColorTest.Changing, tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Changing, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '21', colorHead: ColorTest.Changing, tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Changing, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Changing, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '21', colorHead: ColorTest.Changing, tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '21', color: ColorTest.Modified, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '21', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }]
      ]
    },
    //7ой шаг
    {
      action: { button: ButtonTest.Remove, value: '' },       //добавление элемента по индексу
      animation: [
        [{ value: '0', color: ColorTest.Changing, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Changing, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Changing, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Changing, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Changing, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '8', color: ColorTest.Changing, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Changing, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Changing, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '', color: ColorTest.Changing, head: '', colorHead: '', tail: '8', colorTail: ColorTest.Changing },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }],

        [{ value: '0', color: ColorTest.Default, head: 'head', colorHead: '', tail: '', colorTail: '' },
        { value: '34', color: ColorTest.Default, head: '', colorHead: '', tail: '', colorTail: '' },
        { value: '1', color: ColorTest.Default, head: '', colorHead: '', tail: 'tail', colorTail: '' }]
      ]
    },
  ]


  //основной цикл - проходим по действиям пользователя, вложенный - проходимся кадрам анимации
  function checkAnimation(step,delay) {
    for (let iteration = 0; iteration < consequence[step].animation.length; iteration++) {

      cy.get('[class^="list_list__result"] > [class^="list_list__flex"]').as('circle_content');
      cy.get('@circle_content').should('have.length', consequence[step].animation[iteration].length).each(($circle_content, index) => {
        //проверяем основной круг
        cy.get($circle_content).find('[class^="circle_circle"]').not('[class*="circle_small"]').as('circle');
        cy.get('@circle').parent().find('[class*="circle_index"]').as('circle_index');
        cy.get('@circle').should('have.text', consequence[step].animation[iteration][index].value); //проверяем значение буквы в круге
        cy.get('@circle').should('have.css', 'border', consequence[step].animation[iteration][index].color); //проверяем цвет круга
        cy.get('@circle_index').should('have.text', index); //проверяем значение индекса

        //проверяем head
        if (consequence[step].animation[iteration][index].colorHead !== '') { //если ожидается, что в head есть круг, то ищем его
          cy.get($circle_content).find('[class*="circle_small"]').as('circle_head_circle');
          cy.get('@circle_head_circle').should('have.text', consequence[step].animation[iteration][index].head); //проверяем значение буквы в круге
          cy.get('@circle_head_circle').should('have.css', 'border', consequence[step].animation[iteration][index].colorHead); //проверяем цвет круга
        }
        else { //если круга не должно быть, то проверяем значение в head
          cy.get($circle_content).find('[class*="circle_head"]').first().as('circle_head');
          cy.get('@circle_head').should('have.text', consequence[step].animation[iteration][index].head);
        };

        //проверяем tail
        if (consequence[step].animation[iteration][index].colorTail !== '') { //если ожидается, что в tail есть круг, то ищем его
          cy.get($circle_content).find('[class*="circle_small"]').as('circle_tail_circle');
          cy.get('@circle_tail_circle').should('have.text', consequence[step].animation[iteration][index].tail); //проверяем значение буквы в круге
          cy.get('@circle_tail_circle').should('have.css', 'border', consequence[step].animation[iteration][index].colorTail); //проверяем цвет круга
        }
        else { //если круга не должно быть, то проверяем значение в tail
          cy.get($circle_content).find('[class*="circle_tail"]').first().as('circle_tail');
          cy.get('@circle_tail').should('have.text', consequence[step].animation[iteration][index].tail);
        };
      });
      cy.wait(delay);
    }
  }

   it('Корректная отрисовка дефолтного списка', () => {
 
     const step = 0;
 
     for (let iteration = 0; iteration < consequence[step].animation.length; iteration++) {
       cy.get('[class^="list_list__result"] > [class^="list_list__flex"] > [class^="circle_content"]').as('circle_content');
       cy.get('@circle_content').each(($circle_content, index) => {
         cy.get($circle_content).find('[class^="circle_circle"]').as('circle');
         cy.get($circle_content).find('[class*="circle_index"]').first().as('circle_index');
         cy.get($circle_content).find('[class*="circle_tail"]').first().as('circle_tail');
 
         cy.get('@circle').should('have.text', consequence[step].animation[iteration][index].value); //проверяем значение буквы в круге
         cy.get('@circle').should('have.css', 'border', consequence[step].animation[iteration][index].color); //проверяем цвет круга
         cy.get('@circle_index').should('have.text', index); //проверяем значение индекса
 
 
         cy.get('@circle_tail').should('have.text', consequence[step].animation[iteration][index].tail);//проверяем значение tail
       });
     }
 
     //находим кнопки
     cy.get('button').contains('Удалить из head').parent().as(ButtonTest.RemoveHead);
     cy.get('button').contains('Удалить из tail').parent().as(ButtonTest.RemoveTail);
 
     //проверяем, что кнопки активны
     cy.get(`@${ButtonTest.RemoveHead}`).should('not.be.disabled');
     cy.get(`@${ButtonTest.RemoveTail}`).should('not.be.disabled');
   });
 
   it('Корректная анимация добавления элемента в head списка', () => {
 
     const step = 1;
     //вводим значение в инпут и кликаем добавить в head
     cy.get('input[type=text]').type(consequence[step].action.value);
     cy.get('button').contains('Добавить в head').parent().click();
 
     checkAnimation(step,DELAY_IN_MS);
   });
 
   it('Корректная анимация добавления элемента в tail списка', () => {
 
     const step = 2;
     //вводим значение в инпут и кликаем добавить в head
     cy.get('input[type=text]').type(consequence[step].action.value);
     cy.get('button').contains('Добавить в tail').parent().click();
 
     checkAnimation(step,DELAY_IN_MS);
   });
 
   it('Корректная анимация удаления элемента из head списка', () => {
 
     const step = 3;
     //вводим значение в инпут и кликаем добавить в head
     cy.get('button').contains('Удалить из head').parent().click();
 
     checkAnimation(step,DELAY_IN_MS);
   });
 
   it('Корректная анимация удаления элемента из tail списка', () => {
 
     const step = 4;
     //вводим значение в инпут и кликаем добавить в head
     cy.get('button').contains('Удалить из tail').parent().click();
 
     checkAnimation(step,DELAY_IN_MS);
   });

   it('Корректная анимация добавления элемента по индексу', () => {
 
     const step = 5;
 
     //вводим значение в инпуты и нажимаем добавить по индексу
     cy.get('input[type=text]').type(consequence[step].action.value);
     cy.get('input[type=number]').type(2);
     cy.get('button').contains('Добавить по индексу').parent().click();
 
     checkAnimation(step,0);
   });

  it('Корректная анимация удаления элемента по индексу', () => {

    const step = 6;

    //вводим значение в инпуты и нажимаем добавить по индексу
    cy.get('input[type=number]').type(2);
    cy.get('button').contains('Удалить по индексу').parent().click();

    checkAnimation(step,0);
  });

});