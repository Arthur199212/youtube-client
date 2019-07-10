import './app-view.css';

export default class AppSearchBar {
  constructor() {
    this.data = ''; // I made it only because of Eslint
  }

  drawSearchBar() {
    this.data = ''; // I made it only because of Eslint
    const divWrap = document.createElement('DIV');
    divWrap.setAttribute('class', 'wrap');
    const divSearch = document.createElement('DIV');
    divSearch.setAttribute('class', 'search');
    const inputElem = document.createElement('INPUT');
    inputElem.setAttribute('class', 'searchTerm');
    inputElem.setAttribute('type', 'text');
    inputElem.setAttribute('placeholder', 'What are you looking for?');
    inputElem.setAttribute('id', 'searchBar');
    const buttonSubmit = document.createElement('BUTTON');
    buttonSubmit.setAttribute('class', 'searchButton');
    buttonSubmit.setAttribute('type', 'submit');
    const searchIcon = document.createElement('I');
    searchIcon.setAttribute('class', 'fa fa-search');

    divWrap.appendChild(divSearch);
    divSearch.appendChild(inputElem);
    divSearch.appendChild(buttonSubmit);
    buttonSubmit.appendChild(searchIcon);
    document.body.appendChild(divWrap);

    // * This is for saving last used token
    const sendInfo = document.createElement('INPUT');
    sendInfo.setAttribute('id', 'sendInfo');
    sendInfo.setAttribute('value', '');
    sendInfo.style.display = 'none';
    document.body.appendChild(sendInfo);
  }
}
