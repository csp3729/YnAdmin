const files = import.meta.globEager('./*.js');

export default Object.keys(files).map((key) => files[key].default);
