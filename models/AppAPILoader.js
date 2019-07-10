export default class YouTubeAPILoader {
  constructor(query) {
    this.query = query;
    this.data = {};
    this.apiKey = 'AIzaSyB9VRjJzoqcukSiUxZHJSa_5WxtsPAyPE4'; // this's a new API key
  }

  // * make URL for parsing videos by QUERY
  makeSearchIdUrl(query) {
    return `https://www.googleapis.com/youtube/v3/search?&maxResults=15&type=video&key=${this.apiKey}&part=snippet&q=${query}&fields=items/id/videoId`;
  }

  // * get video id
  async getVideoId() {
    const responce = await fetch(this.makeSearchIdUrl(this.query));
    const data = await responce.json();
    return data;
  }

  // * create URL to make request to get all needed info
  async makeStatisticUrl() {
    let arrayOfObj = await this.getVideoId();
    arrayOfObj = arrayOfObj.items;
    const arrayOfId = [];
    arrayOfObj.forEach((el) => {
      arrayOfId.push(el.id.videoId);
    });
    return `https://www.googleapis.com/youtube/v3/videos?key=${this.apiKey}&id=${arrayOfId.join(',')}&part=snippet,statistics`;
  }

  // * it sends request & gets all needed info
  async getResponceData() {
    const arrayOfId = await this.makeStatisticUrl();
    const responce = await fetch(arrayOfId);
    const data = await responce.json();
    return data;
  }
}
