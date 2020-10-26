// Add the directive "v-pin-on-scroll", to pin the element when scrolling page
// Usage:
// import pinOnScroll from 'tools/directives/pin-on-scroll'
// directives: { pinOnScroll }
// <header v-pin-on-scroll></header>

let container = null;
let element = null;
let elementOffsetTop = null;
let hasAppliedSticky = false;
const STICKY_CLASS = "is-sticky";

function onScroll () {
  if (!hasAppliedSticky && container.scrollTop > elementOffsetTop) {
    element.classList.add(STICKY_CLASS);
    hasAppliedSticky = true;
    container.style.paddingTop = getElementHeightWithMargins(element);
  } else if (hasAppliedSticky && container.scrollTop <= elementOffsetTop) {
    element.classList.remove(STICKY_CLASS);
    hasAppliedSticky = false;
    container.style.paddingTop = 0;
  }
}

function getElementHeightWithMargins (element) {
  const elementStyle = window.getComputedStyle(element);
  return parseInt(elementStyle.height, 10) + parseInt(elementStyle.marginTop, 10) + parseInt(elementStyle.marginBottom, 10) + "px";
}

export default {
  inserted: (elm, binding) => {
    element = elm;
    elementOffsetTop = elm.offsetTop;
    container = document.querySelector(binding.value.container);
    if (container) {
      container.addEventListener("scroll", onScroll);
    }
  },
  unbind: (elm, binding) => {
    elementOffsetTop = null;
    hasAppliedSticky = false;
    window.removeEventListener("scroll", onScroll);
  }
};
