export default class ClipsNotEnough {
  constructor() {
    this.data = null; // eslint
  }

  checking() {
    this.data = null; // eslint
    const allClips = document.querySelectorAll('.slide');
    const quantityOfClips = allClips.length;
    const currentButton = document.querySelector('#current');
    const currentPage = +currentButton.textContent;
    let quantityOfSlidesOnPage = 4;

    if (window.outerWidth > 1400) {
      quantityOfSlidesOnPage = 4;
    } else if (window.outerWidth > 1080) {
      quantityOfSlidesOnPage = 3;
    } else if (window.outerWidth > 730) {
      quantityOfSlidesOnPage = 2;
    } else {
      quantityOfSlidesOnPage = 1;
    }

    // * check how many full slides do we have
    let needMoreClips = Math.floor(quantityOfClips / quantityOfSlidesOnPage);
    needMoreClips = needMoreClips - 4 <= currentPage;

    const chunks = quantityOfClips / 15;

    return {
      getMore: needMoreClips,
      deepOfSearch: chunks,
    };
  }
}
