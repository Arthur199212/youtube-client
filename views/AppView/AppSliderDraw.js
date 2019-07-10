import './app-view.css';

export default class AppSliderDraw {
  constructor() {
    this.data = null;
  }

  // * add more clips to slider
  drawMoreClips() {
    this.data = null;

    // * Create all needed HTML
    const divSlide = document.createElement('DIV');
    divSlide.setAttribute('class', 'slide');
    const divClip = document.createElement('DIV');
    divClip.setAttribute('class', 'clip');
    const divImg = document.createElement('IMG');
    divImg.setAttribute('class', 'clip-preview');
    divImg.setAttribute('data-new', 'data-new');
    divImg.setAttribute('width', '320');
    divImg.setAttribute('height', '180');
    divImg.setAttribute('src', '');
    const divTitle = document.createElement('H2');
    divTitle.setAttribute('class', 'clip-title');
    const divTitleLink = document.createElement('A');
    divTitleLink.setAttribute('class', 'clip-title-link');
    divTitleLink.setAttribute('data-new', 'data-new');
    const divAuthor = document.createElement('DIV');
    divAuthor.setAttribute('class', 'clip-author');
    divAuthor.setAttribute('data-new', 'data-new');
    const divUploadInfo = document.createElement('DIV');
    divUploadInfo.setAttribute('class', 'clip-upload');
    divUploadInfo.setAttribute('data-new', 'data-new');
    const divViewCount = document.createElement('DIV');
    divViewCount.setAttribute('class', 'clip-view-count');
    divViewCount.setAttribute('data-new', 'data-new');
    const divDescription = document.createElement('DIV');
    divDescription.setAttribute('class', 'description-module');
    const pDescription = document.createElement('P');
    pDescription.setAttribute('class', 'clip-description');
    pDescription.setAttribute('data-new', 'data-new');

    // * Put all parts together
    // * Build up clip
    divClip.appendChild(divImg);
    divClip.appendChild(divTitle);
    divTitle.appendChild(divTitleLink);
    divClip.appendChild(divAuthor);
    divClip.appendChild(divUploadInfo);
    divClip.appendChild(divViewCount);
    divDescription.appendChild(pDescription);
    divClip.appendChild(divDescription);
    // * Build up slide, items, ...
    divSlide.appendChild(divClip);

    const itemsOfSlider = document.querySelector('#items');
    itemsOfSlider.appendChild(divSlide);

    const newElem = itemsOfSlider.lastElementChild;

    // * Clone slide to make 15 slides & adding them to #items
    for (let i = 0; i < 14; i += 1) {
      itemsOfSlider.appendChild(newElem.cloneNode(true));
    }
  }

  drawSlider() {
    this.data = null;

    // * Create all needed HTML
    const divSlider = document.createElement('DIV');
    divSlider.setAttribute('class', 'slider');
    divSlider.setAttribute('id', 'slider');
    const divWrapper = document.createElement('DIV');
    divWrapper.setAttribute('class', 'wrapper');
    const divItems = document.createElement('DIV');
    divItems.setAttribute('class', 'items');
    divItems.setAttribute('id', 'items');
    const divSlide = document.createElement('DIV');
    divSlide.setAttribute('class', 'slide');
    const divClip = document.createElement('DIV');
    divClip.setAttribute('class', 'clip');
    const divImg = document.createElement('IMG');
    divImg.setAttribute('class', 'clip-preview');
    divImg.setAttribute('data-new', 'data-new');
    divImg.setAttribute('width', '320');
    divImg.setAttribute('height', '180');
    divImg.setAttribute('src', '');
    const divTitle = document.createElement('H2');
    divTitle.setAttribute('class', 'clip-title');
    const divTitleLink = document.createElement('A');
    divTitleLink.setAttribute('class', 'clip-title-link');
    divTitleLink.setAttribute('data-new', 'data-new');
    const divAuthor = document.createElement('DIV');
    divAuthor.setAttribute('class', 'clip-author');
    divAuthor.setAttribute('data-new', 'data-new');
    const divUploadInfo = document.createElement('DIV');
    divUploadInfo.setAttribute('class', 'clip-upload');
    divUploadInfo.setAttribute('data-new', 'data-new');
    const divViewCount = document.createElement('DIV');
    divViewCount.setAttribute('class', 'clip-view-count');
    divViewCount.setAttribute('data-new', 'data-new');
    const divDescription = document.createElement('DIV');
    divDescription.setAttribute('class', 'description-module');
    const pDescription = document.createElement('P');
    pDescription.setAttribute('class', 'clip-description');
    pDescription.setAttribute('data-new', 'data-new');

    // * Put all parts together
    // * Build up clip
    divClip.appendChild(divImg);
    divClip.appendChild(divTitle);
    divTitle.appendChild(divTitleLink);
    divClip.appendChild(divAuthor);
    divClip.appendChild(divUploadInfo);
    divClip.appendChild(divViewCount);
    divDescription.appendChild(pDescription);
    divClip.appendChild(divDescription);
    // * Build up slide, items, ...
    divSlide.appendChild(divClip);
    divItems.appendChild(divSlide);
    divWrapper.appendChild(divItems);
    divSlider.appendChild(divWrapper);

    // * Clone slide to make 15 slides & adding them to Slider (into tag Items)
    for (let i = 0; i < 14; i += 1) {
      divItems.appendChild(divSlide.cloneNode(true));
    }

    // * Add all to Body
    document.body.appendChild(divSlider);

    // * Create slider control buttons
    const divControlWrap = document.createElement('DIV');
    divControlWrap.setAttribute('class', 'control-wrap');
    divControlWrap.setAttribute('id', 'controlWrap');
    const divSliderPrevButton = document.createElement('DIV');
    divSliderPrevButton.setAttribute('class', 'control prev');
    divSliderPrevButton.setAttribute('id', 'prev');
    const divSliderCurrentButton = document.createElement('DIV');
    divSliderCurrentButton.setAttribute('class', 'control current');
    divSliderCurrentButton.setAttribute('id', 'current');
    const divSliderNextButton = document.createElement('DIV');
    divSliderNextButton.setAttribute('class', 'control next');
    divSliderNextButton.setAttribute('id', 'next');

    // * Create control buttons tips
    const divTipPrev = document.createElement('DIV');
    divTipPrev.setAttribute('class', 'tipPrev');
    divTipPrev.setAttribute('id', 'tipPrev');
    const divTipNext = document.createElement('DIV');
    divTipNext.setAttribute('class', 'tipNext');
    divTipNext.setAttribute('id', 'tipNext');

    divControlWrap.appendChild(divSliderPrevButton);
    divControlWrap.appendChild(divSliderCurrentButton);
    divControlWrap.appendChild(divSliderNextButton);
    divControlWrap.appendChild(divTipPrev);
    divControlWrap.appendChild(divTipNext);
    document.body.appendChild(divControlWrap);
  }
}
