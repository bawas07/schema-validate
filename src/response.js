module.exports = {
    /**
     * type error message
     * @param {string} key name of field
     * @param {string} schema type of field
     * @param {string} lang define return's language
     */
    type: function (key, schema, lang = 'en') {
        if (lang === 'id') {
            return `"${key}" harus berupa "${schema}"`;
        }
        return `"${key}" type must be "${schema}"`;
    },

    /**
     * required error message
     * @param {string} key name of field
     * @param {string} lang define return's language
     */
    required: function (key, lang = 'en') {
        if (lang === 'id') {
            return `parameter "${keys}" harus ada`;
        }
        return `"${key}" is required`;
    },

    min: function (key, schema, lang = 'en') {
        if (lang === 'id') {
            return `jumlah karakter minimal "${key}" adalah "${schema}"`;
        }
        return `"${key}" minimum character is "${schema}"`;
    },

    minNum: function (key, schema, lang = 'en') {
        if (lang === 'id') {
            return `"${key}" harus lebih besar dari "${schema}"`;
        }
        return `"${key}" must be bigger than "${schema}"`;
    },

    max: function (key, schema, lang = 'en') {
        if (lang === 'id') {
            return `jumlah karakter maksimal "${key}" adalah "${schema}"`;
        }
        return `"${key}" maximal character is "${schema}"`;
    },

    maxNum: function (key, schema, lang = 'en') {
        if (lang === 'id') {
            return `"${key}" harus lebih kecil dari "${schema}"`;
        }
        return `"${key}" must be smaller than "${schema}"`;
    }
};
