import SearchTool from './search-tool/index.vue';
import Table from './table/index.vue';
import Pagination from './pagination/index.vue';
import UploadImage from './upload-image/index.vue';
import CommitForm from './commit-form/index.vue';

const components = {
  SearchTool, Table, Pagination, UploadImage, CommitForm,
};

function mapComp(vue, options) {
  Object.keys(components).forEach((name) => {
    vue.component(name, components[name]);
  });
}

export default { install: mapComp };
