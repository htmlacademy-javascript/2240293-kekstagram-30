import './popup.js';
import './form.js';
import './image-editing.js';
import {renderPictures} from './miniature.js';
import {loadPictures} from './api.js';
import {showDataErroreMessage} from './message.js';
import {showImgFiltersSection, setfilterButtonClick, sortUserImages} from './filters.js';
import { debounce } from './util.js';
let pictures = [];
const RERENDER_DELAY = 500;

const bootstrap = async () => {
  try {
    pictures = await loadPictures();
    renderPictures(pictures);
    showImgFiltersSection();
    setfilterButtonClick(debounce(
      (target) => sortUserImages(target), RERENDER_DELAY));
  } catch {
    showDataErroreMessage();
  }
};

bootstrap();

export {pictures};
