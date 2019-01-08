class SchemaValidator {

    constructor() {

    }

    set schema(schm) {
        this.schm = schm
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
                const result = this.type(name, value[name], this.schm[name].type)

                // check variable type
                if (result !== 'pass') {
                    if (err[name] == undefined) {
                        err[name] = []
                    }
                    err[name].push(result)
                } else {
                    res[name] = value[name]
                }

                // check variable mandatory
                if (this.schm[name].required) {
                    if (!value[name]) {
                        if (err[name] == undefined) {
                            err[name] = []
                        }
                        err[name].push(`parameter "${name}" harus ada`)
                    }
                }
            }
            const errKeys = Object.keys(err)
            if (errKeys.length > 0) return reject({ err })
            return resolve({ data: res })
        })

    }

    type(key, value, schema) {
        // console.log({key, value, schema})
        const type = typeof value
        // console.log(type)
        // console.log(schema)
        if (schema !== type) {
            return `parameter "${key}" harus berupa "${schema}"`
        }
        return 'pass'
    }
}

const x = new SchemaValidator
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

