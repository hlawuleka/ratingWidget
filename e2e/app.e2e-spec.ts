import { RatingWidgetPage } from './app.po';

describe('rating-widget App', function() {
  let page: RatingWidgetPage;

  beforeEach(() => {
    page = new RatingWidgetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
