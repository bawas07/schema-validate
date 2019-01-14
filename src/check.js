const response = require('./response.js');


module.exports = {
    /**
     * check parameter's type and return pass or error
     * @param {string} key name of field
     * @param {string} value parameter's data
     * @param {string} lang define return's language
     */
    type: (key, value, schema) => {
        const type = typeof value;
        if (schema !== type) {
            return response.type(key, schema, this.lang);
        }
        return 'pass';
    },

    /**
     * check parameter's length and return pass or error
     * @param {string} key name of field
     * @param {string} value parameter's data
     * @param {string} type schema's parameter's type
     * @param {number} length schema's data
     */
    min: (key, value, type, length) => {
        const leng = value.length;
        if (leng < length && type === 'string') {
            return response.min(key, length, this.lang);
        }

        if (type === 'number' && value < length) {
            return response.minNum(key, length, this.lang);
        }
        return 'pass';
    },

    /**
     * check parameter's length and return pass or error
     * @param {string} key name of field
     * @param {string} value parameter's data
     * @param {string} type schema's parameter's type
     * @param {number} length schema's data
     */
    max: (key, value, type, length) => {
        const leng = value.length;
        if (leng > length && type === 'string') {
            return response.min(key, length, this.lang);
        }

        if (type === 'number' && value > length) {
            return response.minNum(key, length, this.lang);
        }
        return 'pass';
    }
};
