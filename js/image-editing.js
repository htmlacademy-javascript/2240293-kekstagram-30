const MIN_CONTROL_VALUE = 25;
const MAX_CONTROL_VALUE = 100;
const EFFECTS_SLIDER_SETTINGS = [
  {
    id: 'effect-chrome',
    min: '0',
    max: '1',
    step:'0.1',
    filter: 'grayscale'
  },
  {
    id: 'effect-sepia',
    min: '0',
    max: '1',
    step:'0.1',
    filter: 'sepia'
  },
  {
    id: 'effect-marvin',
    min: '0',
    max: '100',
    step:'1',
    filter: 'invert'
  },
  {
    id: 'effect-phobos',
    min: '0',
    max: '3',
    step:'0.1',
    filter: 'blur'
  },
  {
    id: 'effect-heat',
    min: '1',
    max: '3',
    step:'0.1',
    filter: 'brightness'
  }
];
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const controlSmallerBtm = document.querySelector('.scale__control--smaller');
const controlBiggerBtm = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effects = document.querySelectorAll('.effects__radio');
const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const inputUpload = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');

let activeFilter = null;

const onInputUploadChange = () => {
  const file = inputUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.querySelector('img').src = URL.createObjectURL(file);
    effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

inputUpload.addEventListener('change', onInputUploadChange);

const onControlValueChange = () => {
  imgPreview.querySelector('img').style.transform = `scale(${parseInt(controlValue.value, 10) / 100})`;
};

const onControlSmallerBtmClick = () => {
  if (MIN_CONTROL_VALUE < parseInt(controlValue.value, 10)) {
    controlValue.value = `${parseInt(controlValue.value, 10) - 25}%`;
    onControlValueChange();
  }
};

const onControlBiggerBtmClick = () => {
  if (parseInt(controlValue.value, 10) < MAX_CONTROL_VALUE) {
    controlValue.value = `${parseInt(controlValue.value, 10) + 25}%`;
    onControlValueChange();
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const createEffectValue = ({filter}) =>{
  let effectValue = effectLevelValue.value;

  if (filter === 'invert'){
    effectValue = `${effectLevelValue.value}%`;
  } else if(filter === 'blur'){
    effectValue = `${effectLevelValue.value}px`;
  }
  return effectValue;
};

const createEfectSetting = (element) => {
  const targetId = element.target.id;
  return EFFECTS_SLIDER_SETTINGS.find((effect) => effect.id === targetId);
};

const editImgPreview = (filter) => {
  if (!filter) {
    return;
  }

  imgPreview.querySelector('img').style.filter = `${filter.filter}(${createEffectValue(filter)})`;
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  editImgPreview(activeFilter);
});

const onEffectClick = (element) => {
  if (element.target.id === 'effect-none') {
    effectLevelSliderContainer.classList.add('hidden');
    imgPreview.querySelector('img').style = 'none';
    return;
  } else {
    effectLevelSliderContainer.classList.remove('hidden');
  }

  activeFilter = createEfectSetting(element);

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: Number(activeFilter.min),
      max: Number(activeFilter.max),
    },
    step: Number(activeFilter.step),
    start: Number(activeFilter.max)
  });

  editImgPreview(activeFilter);
};

effects.forEach ((element) => {
  element.addEventListener('click', onEffectClick);
});

controlSmallerBtm.addEventListener('click', onControlSmallerBtmClick);
controlBiggerBtm.addEventListener('click', onControlBiggerBtmClick);
