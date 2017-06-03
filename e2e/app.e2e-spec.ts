import { RlPage } from './app.po';

describe('rl App', () => {
  let page: RlPage;

  beforeEach(() => {
    page = new RlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
