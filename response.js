module.exports = {
    /**
     * type error message
     * @param {string} key name of field
     * @param {string} schema type of field
     * @param {string} lang define return's language
     */
    type: function (key, schema, lang = 'en') {
        if (lang === 'id') {
            return `"${key}" harus berupa "${schema}"`
        }
        return `"${key}" type must be "${schema}"`
    },

    /**
     * required error message
     * @param {string} key name of field
     * @param {string} lang define return's language
     */
    required: function (key, lang = 'en') {
        if (lang === 'id') {
            return `parameter "${name}" harus ada`
        }
        return `"${key}" is required`
    }
}