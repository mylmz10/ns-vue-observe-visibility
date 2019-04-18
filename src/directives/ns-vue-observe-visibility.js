const debounce = require('lodash.debounce');

let ScrollView = null;
let ChildrenList = {};
let options = null;

function processOptions(value) {
  let options;
  if (typeof value === 'function') {
    // Simple options (callback-only)
    options = {
      callback: value,
    };
  } else {
    // Options object
    options = value;
  }
  return options;
}

function isVisible(nativeView, scrollview) {
  try {
    const scrollWidth = scrollview.nativeView.getActualSize().width;

    const itemOffsetLeft = nativeView.getLocationRelativeTo(scrollview.nativeView).x;
  
    const itemWidth = nativeView.getActualSize().width;
  
    return itemOffsetLeft + itemWidth >= 0 && itemOffsetLeft <= scrollWidth;
  } catch (ex) {
    console.error('[NS-VUE-OBSERVE-VISIBILITY] Error on function isVisible: ', ex.message);
    return false;
  }
}

function onScroll() {
  Object.keys(ChildrenList).forEach(key => {
    const visibleState = isVisible(ChildrenList[key].nativeView, ScrollView);

    if (visibleState !== ChildrenList[key].visible) {
      if (options.callback) {
        options.callback(visibleState, ChildrenList[key].nativeView);
      }
      ChildrenList[key].visible = visibleState;
    }
  });
}

const debouncedOnScroll = debounce(onScroll, 250);

const VueObserveVisibility = {
  inserted(el, { value }) {
    options = processOptions(value);

    if (el.parentNode && el.parentNode.parentNode && el.parentNode.parentNode.tagName === 'nativescrollview') {
      ChildrenList[el.nativeView.id] = {
        nativeView: el.nativeView,
        visible: false,
      };

      ScrollView = el.parentNode.parentNode;

      ScrollView.addEventListener('onscroll', debouncedOnScroll);
    } else {
      console.warn(`ParentNode of ParentNode should be a nativescrollview!`, 'v-observe-visibility directive'); // eslint-disable-line
    }
  },
  unbind(el) {
    if (el.parentNode && el.parentNode.parentNode && el.parentNode.parentNode.tagName === 'nativescrollview') {
      ScrollView.removeEventListener('onscroll', debouncedOnScroll);
    }
  },
};

export default VueObserveVisibility;
