describe('Проверка поднятия приложения', () => {
  it('Приложение должно успешно запуститься', () => {
    cy.visit('/');
  });
});