import AppVideoData from './AppVideoData';

describe('AppVideoData', () => {
  it('Should be an instance of Constructor', () => {
    const data = {
      items: [
        {
          snippet: {
            publishedAt: '2019-05-16',
            channelId: '001',
            title: 'Title',
            description: 'Description',
            thumbnails: {
              medium: {
                url: 'http://test.com',
              },
            },
            channelTitle: 'Chanel Title',
          },
          statistics: {
            viewCount: '1000000',
          },
        },
      ],
    };

    const num = 0;
    const func = new AppVideoData(data, num);

    expect(func).toBeInstanceOf(AppVideoData);
  });
});

describe('AppVideoData.fillDataOfVideoObj', () => {
  it('Should be an instance of Function', () => {
    const data = {
      items: [
        {
          snippet: {
            publishedAt: '2019-05-16',
            channelId: '001',
            title: 'Title',
            description: 'Description',
            thumbnails: {
              medium: {
                url: 'http://test.com',
              },
            },
            channelTitle: 'Chanel Title',
          },
          statistics: {
            viewCount: '1000000',
          },
        },
      ],
    };

    const num = 0;
    const func = new AppVideoData(data, num);

    expect(func.fillDataOfVideoObj).toBeInstanceOf(Function);
  });

  it('Shoul create an Obj with correct data', () => {
    const data = {
      items: [
        {
          id: '1000',
          snippet: {
            publishedAt: '2019-05-16',
            title: 'Title',
            description: 'Description',
            thumbnails: {
              medium: {
                url: 'http://test.com',
              },
            },
            channelTitle: 'Chanel Name',
          },
          statistics: {
            viewCount: '1000000',
          },
        },
      ],
    };

    const num = 0;
    const func = new AppVideoData(data, num);
    func.fillDataOfVideoObj();

    expect(func.title).toBe('Title');
    expect(func.link).toBe('https://www.youtube.com/watch?v=1000');
    expect(func.clipPreview).toBe('http://test.com');
    expect(func.description).toBe('Description');
    expect(func.channelName).toBe('Chanel Name');
    expect(func.uploadDate).toBe('2019-05-16');
    expect(func.viewCount).toBe('1000000');
  });
});
