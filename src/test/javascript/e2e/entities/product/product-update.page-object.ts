import { element, by, ElementFinder } from 'protractor';

export default class ProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('springReactApp.product.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  productNameInput: ElementFinder = element(by.css('input#product-productName'));
  descriptionInput: ElementFinder = element(by.css('input#product-description'));
  priceInput: ElementFinder = element(by.css('input#product-price'));
  quantityInput: ElementFinder = element(by.css('input#product-quantity'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProductNameInput(productName) {
    await this.productNameInput.sendKeys(productName);
  }

  async getProductNameInput() {
    return this.productNameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
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
