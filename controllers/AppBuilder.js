import AppSearchBar from '../views/AppView/AppSearchBar';
import YouTubeAPILoader from '../models/AppAPILoader';
import VideoObj from '../models/AppVideoData';
import AppSlideDraw from '../views/AppView/AppSliderDraw';
import Slider from './AppSlider';
import ClipsNotEnough from '../models/ClipsNotEnough';
import GetNewAPI from '../models/GetNewAPI';

export default class AppBuilder {
  constructor() {
    this.controller = new AppSearchBar();
    this.videoData = [];
  }

  async getData() {
    // * Clean DOM from prev DATA
    const slider = document.querySelector('#slider');
    const controlWrap = document.querySelector('#controlWrap');
    if (slider) slider.remove();
    if (controlWrap) controlWrap.remove();

    // * Draw basic structure of slider (15 clips)
    this.sliderView = new AppSlideDraw();
    this.slider = new Slider();
    this.sliderView.drawSlider();
    this.slider.runSlider();

    // * These eventListeners are for getting new clips
    // * All aditional clips load only if it's needed and by 15 clips by 1 chunk
    const items = document.querySelector('#items');
    const next = document.querySelector('#next');

    items.addEventListener('mousedown', this.checkOutForNewVideo);
    items.addEventListener('touchend', this.checkOutForNewVideo);
    next.addEventListener('mousedown', this.checkOutForNewVideo);

    this.videoData = [];
    const searchQuery = document.querySelector('#searchBar').value;
    const apiLoader = new YouTubeAPILoader(searchQuery);
    const data = await apiLoader.getResponceData();

    for (let i = 0; i < 15; i += 1) {
      this.videoData.push(new VideoObj(data, i));
      this.videoData[i].fillDataOfVideoObj();
    }

    // * Take view count & transform to understandable string
    function intToString(value) {
      let newValue = value;
      if (value >= 1000) {
        const suffixes = [' views', 'K views', 'M views', 'B views', 'T views'];
        const suffixNum = Math.floor((`${value}`).length / 3);
        let shortValue = '';
        for (let precision = 2; precision >= 1; precision -= 1) {
          // eslint-disable-next-line max-len
          shortValue = parseFloat((suffixNum !== 0 ? (value / (1000 ** suffixNum)) : value).toPrecision(precision));
          const dotLessShortValue = (`${shortValue}`).replace(/[^a-zA-Z 0-9]+/g, '');
          if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
      }
      return newValue;
    }

    // * Take all new elements for work
    const clipPreview = document.querySelectorAll('.clip-preview[data-new="data-new"]');
    const clipTitleLink = document.querySelectorAll('.clip-title-link[data-new="data-new"]');
    const clipAuthor = document.querySelectorAll('.clip-author[data-new="data-new"]');
    const clipUploadDate = document.querySelectorAll('.clip-upload[data-new="data-new"]');
    const clipViewCount = document.querySelectorAll('.clip-view-count[data-new="data-new"]');
    const clipDescription = document.querySelectorAll('.clip-description[data-new="data-new"]');

    // * Get control buttons on webpage
    const controlWrapSecond = document.querySelector('#controlWrap');
    controlWrapSecond.style.display = 'flex';

    for (let i = 0; i < 15; i += 1) {
      clipPreview[i].setAttribute('src', this.videoData[i].clipPreview);
      clipTitleLink[i].setAttribute('href', this.videoData[i].link);
      clipTitleLink[i].setAttribute('alt', this.videoData[i].title);
      clipTitleLink[i].textContent = this.videoData[i].title;
      clipAuthor[i].textContent = this.videoData[i].channelName;
      clipUploadDate[i].textContent = this.videoData[i].uploadDate;
      clipViewCount[i].textContent = intToString(this.videoData[i].viewCount);
      clipDescription[i].textContent = this.videoData[i].description;

      clipPreview[i].removeAttribute('data-new');
      clipTitleLink[i].removeAttribute('data-new');
      clipAuthor[i].removeAttribute('data-new');
      clipUploadDate[i].removeAttribute('data-new');
      clipViewCount[i].removeAttribute('data-new');
      clipDescription[i].removeAttribute('data-new');
    }
  }

  // * This is for checking if we need more video & if Yes then load them to slider
  async checkOutForNewVideo() {
    this.videoData = [];
    this.newClips = new ClipsNotEnough();
    const check = this.newClips.checking();

    // * Take view count & transform to understandable string
    function intToString(value) {
      let newValue = value;
      if (value >= 1000) {
        const suffixes = [' views', 'K views', 'M views', 'B views', 'T views'];
        const suffixNum = Math.floor((`${value}`).length / 3);
        let shortValue = '';
        for (let precision = 2; precision >= 1; precision -= 1) {
          // eslint-disable-next-line max-len
          shortValue = parseFloat((suffixNum !== 0 ? (value / (1000 ** suffixNum)) : value).toPrecision(precision));
          const dotLessShortValue = (`${shortValue}`).replace(/[^a-zA-Z 0-9]+/g, '');
          if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
      }
      return newValue;
    }

    if (check.getMore) {
      this.newAPI = new GetNewAPI();
      const newResponce = await this.newAPI.run(check);

      // * Get control buttons on webpage
      const controlWrap = document.querySelector('#controlWrap');
      controlWrap.style.display = 'flex';

      for (let i = 0; i < 15; i += 1) {
        this.videoData.push(new VideoObj(newResponce, i));
        this.videoData[i].fillDataOfVideoObj();
      }

      // * Add new clips after the previous ones
      this.sliderView = new AppSlideDraw();
      this.sliderView.drawMoreClips();

      // * Take all new elements for work
      const clipPreview = document.querySelectorAll('.clip-preview[data-new="data-new"]');
      const clipTitleLink = document.querySelectorAll('.clip-title-link[data-new="data-new"]');
      const clipAuthor = document.querySelectorAll('.clip-author[data-new="data-new"]');
      const clipUploadDate = document.querySelectorAll('.clip-upload[data-new="data-new"]');
      const clipViewCount = document.querySelectorAll('.clip-view-count[data-new="data-new"]');
      const clipDescription = document.querySelectorAll('.clip-description[data-new="data-new"]');

      // * Fill only new clips with Data from YouTube
      for (let i = 0; i < 15; i += 1) {
        clipPreview[i].setAttribute('src', this.videoData[i].clipPreview);
        clipTitleLink[i].setAttribute('href', this.videoData[i].link);
        clipTitleLink[i].setAttribute('alt', this.videoData[i].title);
        clipTitleLink[i].textContent = this.videoData[i].title;
        clipAuthor[i].textContent = this.videoData[i].channelName;
        clipUploadDate[i].textContent = this.videoData[i].uploadDate;
        clipViewCount[i].textContent = intToString(this.videoData[i].viewCount);
        clipDescription[i].textContent = this.videoData[i].description;

        clipPreview[i].removeAttribute('data-new');
        clipTitleLink[i].removeAttribute('data-new');
        clipAuthor[i].removeAttribute('data-new');
        clipUploadDate[i].removeAttribute('data-new');
        clipViewCount[i].removeAttribute('data-new');
        clipDescription[i].removeAttribute('data-new');
      }
    }
  }

  run() {
    // * Add Fontawesome
    const fontAwesome = document.createElement('LINK');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
    fontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
    fontAwesome.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(fontAwesome);

    // * Add meta data for proper work of media queries
    const mediaQ = document.createElement('META');
    mediaQ.content = 'width=device-width, initial-scale=1';
    mediaQ.name = 'viewport';
    document.head.appendChild(mediaQ);

    this.controller.drawSearchBar();
    const searchBar = document.querySelector('#searchBar');
    const searchButton = document.querySelector('.searchButton');
    const getData = this.getData.bind(this);

    searchBar.addEventListener('change', getData);
    searchButton.addEventListener('click', getData);
  }
}
