export default class Slider {
  constructor() {
    this.slider = document.querySelector('#slider');
    this.data = false;
  }

  runSlider() {
    this.slider = document.querySelector('#slider'); // eslint
    const slider = document.querySelector('#slider');
    const items = document.querySelector('#items');
    const prev = document.querySelector('#prev');
    const currentButton = document.querySelector('#current');
    const next = document.querySelector('#next');
    const tipPrev = document.querySelector('#tipPrev');
    const tipNext = document.querySelector('#tipNext');
    let index = 0;
    // eslint-disable-next-line no-unused-vars
    let indexOfCurrentElement = 0;
    let newIndexOfCurrentElement = 0;
    let quantityOfClips = 4;
    let prevQuantityOfClips = null;
    let indexOfSlide = 0;
    let prevSlideWidth = 350;

    function slide() {
      let posX1 = 0;
      let posX2 = 0;
      let startPosition;
      let posFinal;
      const threshold = 50;
      let slideSize = slider.offsetWidth;
      let allowShift = true;

      function shiftSlide(dir, action) {
        const oneSlideWidth = document.querySelector('.slide').offsetWidth;

        slideSize = document.querySelector('.slider').offsetWidth;
        items.classList.add('shifting');

        if (allowShift) {
          if (!action) { startPosition = items.offsetLeft; }

          if (dir === 1) {
            index += 1;

            items.style.left = `${index * slideSize * -1}px`;
          } else if (dir === -1) {
            index -= 1;
            if (index < 0) {
              index = 0;
            }
            items.style.left = `${index * slideSize * -1}px`;
          }

          // * FOR SLIDER
          // * Current page & tips
          currentButton.textContent = `${index + 1}`;
          tipPrev.textContent = `${index}`;
          tipNext.textContent = `${index + 2}`;
          // * Hide prev button if it's the first page
          if (index === 0) {
            prev.style.opacity = '0';
            prev.style.cursor = 'default';
            tipPrev.style.opacity = '0';
          } else {
            prev.style.opacity = '1';
            prev.style.cursor = 'pointer';
          }
          // * ---end---

          indexOfCurrentElement = Math.floor(+items.style.left.slice(0, -2) / oneSlideWidth * -1);
        }

        allowShift = false;
      }

      function dragAction(e) {
        if (e.type === 'touchmove') {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }
        items.style.left = `${items.offsetLeft - posX2}px`;
      }

      function dragEnd() {
        posFinal = items.offsetLeft;
        if (posFinal - startPosition < threshold * (-1)) {
          shiftSlide(1, 'drag');
        } else if (posFinal - startPosition > threshold) {
          shiftSlide(-1, 'drag');
        } else {
          items.style.left = `${startPosition}px`;
        }

        document.onmouseup = null;
        document.onmousemove = null;
      }

      function dragStart(e) {
        e.preventDefault();
        startPosition = index * slideSize * -1;

        items.classList.remove('shifting');
        allowShift = true;

        if (e.type === 'touchstart') {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }

      function shifting() {
        items.classList.remove('shifting');
        allowShift = true;
      }

      function setButtonTips() {
        prev.style.position = 'relative';
        next.style.position = 'relative';
      }

      function openTipsPrev() {
        if (index === 0) {
          tipPrev.style.opacity = '0';
        } else {
          tipPrev.style.opacity = '1';
        }
      }

      function closeTipsPrev() {
        tipPrev.style.opacity = '0';
      }

      function openTipsNext() {
        tipNext.style.opacity = '1';
      }

      function closeTipsNext() {
        tipNext.style.opacity = '0';
      }

      // * Control buttons tips events
      prev.addEventListener('mousedown', openTipsPrev);
      next.addEventListener('mousedown', openTipsNext);
      prev.addEventListener('mouseup', closeTipsPrev);
      next.addEventListener('mouseup', closeTipsNext);
      prev.addEventListener('mouseout', closeTipsPrev);
      next.addEventListener('mouseout', closeTipsNext);

      // * Current page draw for slider buttons & tips
      currentButton.textContent = `${index + 1}`;
      tipPrev.textContent = `${index}`;
      tipNext.textContent = `${index + 2}`;

      // * Tips for slider buttons
      setButtonTips();

      // * Mouse and Touch events
      items.onmousedown = dragStart;

      // * Touch events
      items.addEventListener('touchstart', dragStart);
      items.addEventListener('touchend', dragEnd);
      items.addEventListener('touchmove', dragAction);

      // * Click events
      prev.addEventListener('click', () => { shiftSlide(-1); });
      next.addEventListener('click', () => { shiftSlide(1); });

      // * Transition events
      items.addEventListener('transitionend', shifting);
    }

    function checkSizeOfWindow() {
      const screan = document.querySelector('html');
      const screanSize = screan.offsetWidth;

      const oneSlideWidth = document.querySelector('.slide').offsetWidth;

      indexOfSlide = Math.round(+items.style.left.slice(0, -2) / prevSlideWidth * -1);

      // * Number of clips on the screan
      if (screanSize > 1400) {
        quantityOfClips = 4;
        prevSlideWidth = 350;
      } else if (screanSize > 1080) {
        quantityOfClips = 3;
        prevSlideWidth = 360;
      } else if (screanSize > 730) {
        quantityOfClips = 2;
        prevSlideWidth = 365;
      } else {
        quantityOfClips = 1;
        prevSlideWidth = 320;
      }

      if (quantityOfClips !== prevQuantityOfClips) {
        index = Math.floor(indexOfSlide / quantityOfClips);
        items.style.left = `${index * prevSlideWidth * quantityOfClips * -1}px`;
      }

      newIndexOfCurrentElement = Math.floor(+items.style.left.slice(0, -2) / oneSlideWidth * -1);

      prevQuantityOfClips = quantityOfClips;
      indexOfCurrentElement = newIndexOfCurrentElement;

      // * Current page draw for slider buttons & tips
      currentButton.textContent = `${index + 1}`;
      tipPrev.textContent = `${index}`;
      tipNext.textContent = `${index + 2}`;
    }

    prevQuantityOfClips = quantityOfClips;

    checkSizeOfWindow();

    window.onresize = checkSizeOfWindow;

    slide(this);
  }
}
