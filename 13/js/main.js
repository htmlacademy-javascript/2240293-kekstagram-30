import './popup.js';
import './form.js';
import './imageEditing.js';
import {renderPictures} from './miniature.js';
import {loadPictures} from './api.js';
import {showDataErroreMessande} from './message.js';
import {showImgFiltersSection, setfilterBtnClick, sortUserImages} from './filters.js';
import { debounce } from './util.js';
let pictures = [];
const RERENDER_DELAY = 500;

const bootstrap = async () => {
  try {
    pictures = await loadPictures();
    renderPictures(pictures);
    showImgFiltersSection();
    setfilterBtnClick(debounce(
      (target) => sortUserImages(target), RERENDER_DELAY));
  } catch {
    showDataErroreMessande();
  }
};

bootstrap();

export {pictures};
