import './popup.js';
import './form.js';
import './imageEditing.js';
import {renderPictures} from './miniature';
import {loadPictures} from './api.js';
import {showDataErroreMessande} from './message.js';
import {showImgFiltersSection} from './filters.js';
let pictures = [];

const bootstrap = async () => {
  try {
    pictures = await loadPictures();
    renderPictures(pictures);
    showImgFiltersSection();
  } catch {
    showDataErroreMessande();
  }
};

bootstrap();

export {pictures};
