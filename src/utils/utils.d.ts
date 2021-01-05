declare var _default: Utils;
export default _default;
declare class Utils {
  sleep(millisecond: any): Promise<any>;
  getQueryParams(url?: string): {};
  setQueryParams(url: any, params: any): string;
  toQueryParams(queryString: any): {};
  toQueryString(queryParams: any): string;
  toInt(str: any, defaultValue: any): any;
  random(min: any, max: any): any;
  randomFloat(min: any, max: any, fixed?: number): any;
  randomArray(max: any, min: any, count: any): any[];
  merge(...args: any[]): void;
  buildObjectTree(list: any): {};
  buildListTree(list: any): any[];
  parseObjectTree(objectTree: any): any[];
  lastOne(arr: any): any;
  cloneDeep(obj: any): any;
  promiseAllSettled(promiseList: any): Promise<any>;
}
