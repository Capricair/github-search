class Utils {
  sleep(millisecond) {
    return new Promise((resolve) => {
      setTimeout(resolve, millisecond);
    });
  }

  getQueryParams(url = "") {
    return this.toQueryParams(url);
  }

  setQueryParams(url, params) {
    const index = url.indexOf("?");
    return `${url.substring(0, index > -1 ? index : url.length)}?${this.toQueryString(params)}`;
  }

  toQueryParams(queryString) {
    let result = {};
    queryString
      .substring(queryString.indexOf("?") + 1)
      .split("&")
      .map((x) => x.split("="))
      .forEach((item) => {
        let key = item[0];
        let value = item[1];
        if (key && value) {
          result[key] = value;
        }
      });
    return result;
  }

  toQueryString(queryParams) {
    let result = Object.keys(queryParams || {})
      .sort()
      .map((key) => {
        if (queryParams[key]) {
          return `${key}=${queryParams[key]}`;
        } else {
          return null;
        }
      })
      .filter((str) => !!str);
    return result.join("&");
  }

  toInt(str, defaultValue) {
    let result = parseInt(str);
    return isNaN(result) ? defaultValue : result;
  }

  // 包含min，max
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomFloat(min, max, fixed = 2) {
    return (Math.random() * (max - min) + min).toFixed(fixed);
  }

  randomArray(max, min, count) {
    let list = new Set();
    while (list.size < count) {
      let num = this.random(max, min);
      list.add(num);
    }
    return Array.from(list);
  }

  merge() {
    const target = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
      const option = arguments[i];
      for (const key of Object.keys(option)) {
        if (option[key]) {
          target[key] = option[key];
        }
      }
    }
  }

  buildObjectTree(list) {
    let temp = {};
    let tree = {};
    for (let i = 0; i < list.length; i++) {
      temp[list[i].id] = list[i];
    }
    for (let i of Object.keys(temp)) {
      if (temp[i].parentId) {
        if (!temp[temp[i].parentId].children) {
          temp[temp[i].parentId].children = {};
        }
        temp[temp[i].parentId].children[temp[i].id] = temp[i];
      } else {
        tree[temp[i].id] = temp[i];
      }
    }
    return tree;
  }

  buildListTree(list) {
    let temp = {};
    let tree = {};
    for (let i = 0; i < list.length; i++) {
      temp[list[i].id] = list[i];
    }
    for (let i of Object.keys(temp)) {
      if (temp[i].parentId) {
        if (!temp[temp[i].parentId].children) {
          temp[temp[i].parentId].children = {};
        }
        temp[temp[i].parentId].children[temp[i].id] = temp[i];
      } else {
        tree[temp[i].id] = temp[i];
      }
    }
    return this.parseObjectTree(tree);
  }

  parseObjectTree(objectTree) {
    const arr = [];
    for (const key of Object.keys(objectTree)) {
      const node = objectTree[key];
      arr.push(node);
      if (node.children) {
        node.children = this.parseObjectTree(node.children);
      }
    }
    return arr;
  }

  lastOne(arr) {
    return arr[arr.length - 1];
  }

  cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  promiseAllSettled(promiseList) {
    return new Promise((resolve) => {
      let results = [];
      let counter = 0;
      for (let i = 0; i < promiseList.length; i++) {
        const promise = promiseList[i];
        promise
          .then((result) => {
            results[i] = result;
          })
          .catch((e) => {
            console.error(e);
            results[i] = null;
          })
          .finally(() => {
            counter++;
            if (counter === promiseList.length) {
              resolve(results);
            }
          });
      }
    });
  }
}

export default new Utils();
