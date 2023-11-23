import './popup.js';
import './form.js';
import './image-editing.js';
import {renderPictures} from './miniature.js';
import {loadPictures} from './api.js';
import {showDataErroreMessage} from './message.js';
import {showImgFiltersSection, setfilterButtonClick, sortUserImages, getArrayPhotosFilter} from './filters.js';
import { debounce } from './util.js';
import {getArrayPhotosPopup} from './popup.js';

const RERENDER_DELAY = 500;

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
    getArrayPhotosPopup(pictures);
    showImgFiltersSection();
    getArrayPhotosFilter(pictures);
    setfilterButtonClick(debounce(
      (target) => sortUserImages(target), RERENDER_DELAY));
  } catch {
    showDataErroreMessage();
  }
};

bootstrap();
