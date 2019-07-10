export default class GetNewAPI {
  constructor(data) {
    this.data = data;
    this.query = document.querySelector('#searchBar').value;
    this.apiKey = 'AIzaSyB9VRjJzoqcukSiUxZHJSa_5WxtsPAyPE4'; // this's a new API key
  }

  // * make URL for parsing videos by QUERY
  makeSearchIdUrl() {
    const query = document.querySelector('#searchBar').value;
    return `https://www.googleapis.com/youtube/v3/search?&maxResults=15&type=video&key=${this.apiKey}&part=snippet&q=${query}&fields=items/id/videoId,nextPageToken`;
  }

  // * get first PageToken
  async getPageToken() {
    const responce = await fetch(this.makeSearchIdUrl());
    const data = await responce.json();
    return data.nextPageToken;
  }

  // * for making URL for parsing new videos by QUERY
  makeNextSearchIdUrl(token) {
    const query = document.querySelector('#searchBar').value;
    return `https://www.googleapis.com/youtube/v3/search?&maxResults=15&type=video&key=${this.apiKey}&part=snippet&pageToken=${token}&q=${query}&fields=items/id/videoId,nextPageToken`;
  }

  // * get nextPageToken
  async getNextPageToken(token) {
    const responce = await fetch(this.makeNextSearchIdUrl(token));
    const data = await responce.json();
    return data.nextPageToken;
  }

  // * get video id
  async getNewVideoId(token) {
    const responce = await fetch(this.makeNextSearchIdUrl(token));
    const data = await responce.json();
    return data;
  }

  // * create URL to make request to get all needed info
  async makeNewStatisticUrl(token) {
    let arrayOfObj = await this.getNewVideoId(token);
    arrayOfObj = arrayOfObj.items;
    const arrayOfId = [];
    arrayOfObj.forEach((el) => {
      arrayOfId.push(el.id.videoId);
    });
    return `https://www.googleapis.com/youtube/v3/videos?key=${this.apiKey}&id=${arrayOfId.join(',')}&part=snippet,statistics`;
  }

  // * it sends request & gets all needed info
  async getNewResponceData(token) {
    const arrayOfId = await this.makeNewStatisticUrl(token);
    const responce = await fetch(arrayOfId);
    const data = await responce.json();

    // * Save token
    const prevToken = document.querySelector('#sendInfo');
    prevToken.value = token;

    return data;
  }

  async run(data) { // an instance of getting data => { getMore: true, deepOfSearch: 2 }
    const prevToken = document.querySelector('#sendInfo').value;
    let token = null;

    // * If there's a previous token then use it
    if (!prevToken) {
      const firstToken = await this.getPageToken();
      token = firstToken;
    } else {
      token = prevToken;
    }

    for (let i = 0; i < data.deepOfSearch; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      token = await this.getNextPageToken(token);
    }

    const newVideoData = await this.getNewResponceData(token);
    return newVideoData;
  }
}
