import AppAPILoader from './AppAPILoader';

describe('AppAPILoader.makeSearchIdUrl', () => {
  it('Should be an instance of Function', () => {
    const apiLoader = new AppAPILoader();

    expect(apiLoader.makeSearchIdUrl).toBeInstanceOf(Function);
  });

  it('Should return search link', () => {
    const apiLoader = new AppAPILoader();

    const query = 'test-query';

    const result = apiLoader.makeSearchIdUrl(query);

    expect(result).toBe('https://www.googleapis.com/youtube/v3/search?&maxResults=15&type=video&key=AIzaSyBJF6IlnlKKKiAuAWD-zJuG2zhjsvAcdw8&part=snippet&q=test-query&fields=items/id/videoId');
  });
});

describe('AppAPILoader.getVideoId', () => {
  it('Should instance of Function', () => {
    const apiLoader = new AppAPILoader();

    expect(apiLoader.makeSearchIdUrl).toBeInstanceOf(Function);
  });
});

describe('AppAPILoader.makeStatisticUrl', () => {
  it('Should instance of Function', () => {
    const apiLoader = new AppAPILoader();

    expect(apiLoader.makeSearchIdUrl).toBeInstanceOf(Function);
  });
});

describe('AppAPILoader.getResponceData', () => {
  it('Should instance of Function', () => {
    const apiLoader = new AppAPILoader();

    expect(apiLoader.makeSearchIdUrl).toBeInstanceOf(Function);
  });
});
