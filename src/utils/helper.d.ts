declare var _default: Helper;
export default _default;
declare class Helper {
  http: {
    get: (url: any, data: any) => Promise<any>;
    post: (url: any, data: any) => Promise<any>;
  };
  validateForm(formData: any, formRules: any): void;
}
