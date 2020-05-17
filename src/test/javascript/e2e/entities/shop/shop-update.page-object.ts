import { element, by, ElementFinder } from 'protractor';

export default class ShopUpdatePage {
  pageTitle: ElementFinder = element(by.id('springReactApp.shop.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  shopNameInput: ElementFinder = element(by.css('input#shop-shopName'));
  userSelect: ElementFinder = element(by.css('select#shop-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setShopNameInput(shopName) {
    await this.shopNameInput.sendKeys(shopName);
  }

  async getShopNameInput() {
    return this.shopNameInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
