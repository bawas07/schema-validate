const response = require('./src/response.js');
const check = require('./src/check.js');

class SchemaValidator {

    constructor() {
        // this.err = {}
        // this.res = {}
    }

    set schema(schm) {
        this.schm = schm;
    }

    set language(lang) {
        this.lang = lang;
    }

    async validateCB(value, cb) {
        try {
            const res = await this.validate(value);
            return cb(null, res);
        } catch (err) {
            return cb(err, null);
        }
    }

    validate(value) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(this.schm);
            const err = {};
            const res = {};
            for (let i = 0; i < keys.length; i++) {
                const name = keys[i];

                // check variable mandatory
                if (this.schm[name].required) {
                    if (!value[name]) {
                        if (err[name] == undefined) {
                            err[name] = [];
                        }
                        err[name].push(response.required(name, this.lang));
                    }
                }

                const optional = (this.schm[name].required || value[name]);
                if (optional) {

                    // check variable type
                    const type = check.type(name, value[name], this.schm[name].type);
                    if (type !== 'pass') {
                        if (err[name] == undefined) {
                            err[name] = [];
                        }
                        err[name].push(type);
                    } else {
                        res[name] = value[name];
                    }

                    // check minimal number or length
                    const minimal = check.min(name, value[name], this.schm[name].type, this.schm[name].min);
                    if (minimal !== 'pass') {
                        if (err[name] == undefined) {
                            err[name] = [];
                        }
                        err[name].push(minimal);
                    } else {
                        res[name] = value[name];
                    }

                    // check maximal number or length
                    const maximal = check.max(name, value[name], this.schm[name].type, this.schm[name].max);
                    if (maximal !== 'pass') {
                        if (err[name] == undefined) {
                            err[name] = [];
                        }
                        err[name].push(maximal);
                    } else {
                        res[name] = value[name];
                    }
                    // check restricted value input (enum)
                    const enumerate = check.enum(name, value[name], this.schm[name].enum);
                    // console.log({enumerate, x:this.schm[name]})
                    if (enumerate !== 'pass') {
                        if (err[name] == undefined) {
                            err[name] = [];
                        }
                        err[name].push(enumerate);
                    } else {
                        res[name] = value[name];
                    }
                }
            }

            // return process
            const errKeys = Object.keys(err);
            if (errKeys.length > 0) return reject({ err });
            return resolve({ data: res });
        });

    }

    // /**
    //  * check parameter's type and return pass or error
    //  * @param {string} key name of field
    //  * @param {string} value parameter's data
    //  * @param {string} lang define return's language
    //  */
    // type(key, value, schema) {
    //     const type = typeof value
    //     if (schema !== type) {
    //         return response.type(key, schema, this.lang)
    //     }
    //     return 'pass'
    // }

    // /**
    //  * check parameter's length and return pass or error
    //  * @param {string} key name of field
    //  * @param {string} value parameter's data
    //  * @param {string} type schema's parameter's type
    //  * @param {number} length schema's data
    //  */
    // min(key, value, type, length) {
    //     const leng = value.length
    //     if (leng < length && type === 'string') {
    //         return response.min(key, length, this.lang)
    //     }
    //
    //     if (type === 'number' && value < length) {
    //         return response.minNum(key, length, this.lang)
    //     }
    //     return 'pass'
    // }
}

const x = new SchemaValidator;
x.language = 'id';
x.schema = {
    name: {
        type: 'string',
        // required: true,
        // max: 2
        enum: ['udin', 'ujang', 'usep']
    },
    age: {
        type: 'number',
        // max: 2
    }
};

const input = {
    name: 'usep',
    age: 5
};

const run = async () => {
    console.log('\n\n----------------');
    console.log('PROMISE');
    console.log('----------------');
    try{
        const value = await x.validate(input);
        console.log( value );
    } catch (err) {
        console.log( err );
    }
};
// console.log(y)
run();

x.validateCB(input, (err, res) => {
    console.log('\n\n----------------');
    console.log('CALLBACK');
    console.log('----------------');
    if (err) {
        return console.log(err);
    }
    return console.log(res);
});
