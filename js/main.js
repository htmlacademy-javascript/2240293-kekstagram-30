import './popup.js';
import './form.js';
import './imageEditing.js';
import {renderPictures} from './miniature';
import {loadPictures} from './api.js';
import {showDataErroreMessande} from './message.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
  } catch {
    showDataErroreMessande();
  }
};

bootstrap();
