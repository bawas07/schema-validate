const response = require('./response.js')

class SchemaValidator {

    constructor() {

    }

    set schema(schm) {
        this.schm = schm
    }

    set language(lang) {
        this.lang = lang
    }

    async validateCB(value, cb) {
        try {
            const res = await this.validate(value)
            return cb(null, res)
        } catch (err) {
            return cb(err, null)
        }
    }

    validate(value) {
        // console.log(this.schm)
        return new Promise((resolve, reject) => {
            const keys = Object.keys(this.schm)
            const err = {}
            const res = {}
            for (let i = 0; i < keys.length; i++) {
                const name = keys[i]
                const type = this.type(name, value[name], this.schm[name].type)
                // check variable type
                if (type !== 'pass' && (this.schm[name].required || value[name])) {
                    if (err[name] == undefined) {
                        err[name] = []
                    }
                    err[name].push(type)
                } else {
                    res[name] = value[name]
                }

                // check variable mandatory
                if (this.schm[name].required) {
                    if (!value[name]) {
                        if (err[name] == undefined) {
                            err[name] = []
                        }
                        err[name].push(response.required(name, this.lang))
                    }
                }
            }

            // return process
            const errKeys = Object.keys(err)
            if (errKeys.length > 0) return reject({ err })
            return resolve({ data: res })
        })

    }

    /**
     * check parameter's type and return pass or error
     * @param {string} key name of field
     * @param {string} value parameter's data
     * @param {string} lang define return's language
     */
    type(key, value, schema) {
        const type = typeof value
        if (schema !== type) {
            return response.type(key, schema, this.lang)
        }
        return 'pass'
    }
}

const x = new SchemaValidator
// x.language = 'id'
x.schema = {
    name: {
        type: 'string',
        required: true,
        min: 10
    },
    age: {
        type: 'number'
    }
}

const input = {
    // name: 'udin',
    age: '20'
}

const run = async () => {
    console.log('\n\n----------------')
    console.log('PROMISE')
    console.log('----------------')
    try{
        const value = await x.validate(input) 
        console.log( value )
    } catch (err) {
        console.log( err )
    }
}
// console.log(y)
run()

x.validateCB(input, (err, res) => {
    console.log('\n\n----------------')
    console.log('CALLBACK')
    console.log('----------------')
    if (err) {
        return console.log(err)
    }
    return console.log(res)
})

