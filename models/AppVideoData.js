export default class VideoObj {
  constructor(data, number) {
    this.data = data;
    this.number = number;
    this.basicLink = this.data.items[this.number];
  }

  fillDataOfVideoObj() {
    this.title = this.basicLink.snippet.title;
    this.id = this.basicLink.id;
    this.link = `https://www.youtube.com/watch?v=${this.id}`;
    this.clipPreview = this.basicLink.snippet.thumbnails.medium.url;
    this.description = this.basicLink.snippet.description;
    this.channelName = this.basicLink.snippet.channelTitle;
    this.uploadDate = (this.basicLink.snippet.publishedAt).slice(0, 10);
    this.viewCount = this.basicLink.statistics.viewCount;
  }
}
