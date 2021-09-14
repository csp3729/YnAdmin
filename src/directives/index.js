import { store } from '@uts/instance';

const directives = {
  color(el, binding) {
    el.style.color = binding.value;
  },
  auth(el, binding) {
    const { authButtons } = store.getters;
    const { value } = binding;
    if (!authButtons?.includes(value)) el.parentNode?.removeChild(el);
  },
};

function mapDirective(vue, options) {
  Object.keys(directives).forEach((dir) => {
    vue.directive(dir, directives[dir]);
  });
}

export default { install: mapDirective };
