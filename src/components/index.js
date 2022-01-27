// import * as $Icon from '@element-plus/icons-vue';
import SearchForm from './search-form/index.vue';
import Table from './table/index.vue';
import Pagination from './pagination/index.vue';
import UploadImage from './upload-image/index.vue';
import CommitForm from './commit-form/index.vue';
import Icon from './icon/index.vue';

// console.log($Icon);

const components = {
  SearchForm, Table, Pagination, UploadImage, CommitForm, Icon,
};

// const coms = import.meta.glob('./**/index.vue');

// console.log(coms);

function mapComp(vue, options) {
  Object.keys(components).forEach((name) => {
    vue.component(name, components[name]);
  });
}

export default { install: mapComp };
