import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ShopComponentsPage, { ShopDeleteDialog } from './shop.page-object';
import ShopUpdatePage from './shop-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('Shop e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shopComponentsPage: ShopComponentsPage;
  let shopUpdatePage: ShopUpdatePage;
  let shopDeleteDialog: ShopDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Shops', async () => {
    await navBarPage.getEntityPage('shop');
    shopComponentsPage = new ShopComponentsPage();
    expect(await shopComponentsPage.title.getText()).to.match(/Shops/);

    expect(await shopComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([shopComponentsPage.noRecords, shopComponentsPage.table]);

    beforeRecordsCount = (await isVisible(shopComponentsPage.noRecords)) ? 0 : await getRecordsCount(shopComponentsPage.table);
  });

  it('should load create Shop page', async () => {
    await shopComponentsPage.createButton.click();
    shopUpdatePage = new ShopUpdatePage();
    expect(await shopUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Shop/);
    await shopUpdatePage.cancel();
  });

  it('should create and save Shops', async () => {
    await shopComponentsPage.createButton.click();
    await shopUpdatePage.setShopNameInput('shopName');
    expect(await shopUpdatePage.getShopNameInput()).to.match(/shopName/);
    await shopUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(shopUpdatePage.saveButton);
    await shopUpdatePage.save();
    await waitUntilHidden(shopUpdatePage.saveButton);
    expect(await isVisible(shopUpdatePage.saveButton)).to.be.false;

    expect(await shopComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(shopComponentsPage.table);

    await waitUntilCount(shopComponentsPage.records, beforeRecordsCount + 1);
    expect(await shopComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Shop', async () => {
    const deleteButton = shopComponentsPage.getDeleteButton(shopComponentsPage.records.last());
    await click(deleteButton);

    shopDeleteDialog = new ShopDeleteDialog();
    await waitUntilDisplayed(shopDeleteDialog.deleteModal);
    expect(await shopDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/springReactApp.shop.delete.question/);
    await shopDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(shopDeleteDialog.deleteModal);

    expect(await isVisible(shopDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([shopComponentsPage.noRecords, shopComponentsPage.table]);

    const afterCount = (await isVisible(shopComponentsPage.noRecords)) ? 0 : await getRecordsCount(shopComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
