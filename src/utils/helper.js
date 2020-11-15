import axios from "axios";

class Helper {
    http = {
        get: async (url, data) => {
            const response = await axios.get(url, { params: data });
            const result = response.data;
            if (result.status !== 200){
                throw new Error(result.message);
            }
            return response.data;
        },
        post: async (url, data) => {
            const response = await axios.post(url, data);
            const result = response.data;
            if (result.status !== 200){
                throw new Error(result.message);
            }
            return response.data;
        },
    };

    validateForm(formData, formRules) {
        for (const field of Object.keys(formRules)) {
            const value = formData[field];
            const rule = formRules[field];
            if (rule.required) {
                if ((typeof value === "object" && Object.keys(value).length === 0) || !value) {
                    throw new Error(rule.required.message);
                }
            }
            if (rule.pattern) {
                if (rule.pattern.validator && !rule.pattern.validator(value, formData)) {
                    throw new Error(rule.pattern.message);
                }
            }
        }
    }
}

export default new Helper();
