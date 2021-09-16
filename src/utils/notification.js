export default class notifide {
  constructor(option) {
    this.defaultOption = {
      title: '',
      message: '',
      type: '',
      duration: 4500,
      position: '',
      showClose: true,
      onClose() {},
      onClick() {},
      offset: 0,
      desktop: false,
      tag: '',
    };

    Object.assign(this.defaultOption, option);
  }
}
