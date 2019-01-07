class SchemaValidator {

    constructor() {

    }

    set schema(schm) {
        this.schm = schm
    }

    validate(value) {
        console.log(this.schm)
        const keys = Object.keys(value)
        const err = []
        const res = {}
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i]
            const result = this.check(name, value[name], this.schm[name].type)
            if (result !== 'pass') {
                err.push(result)
            } else {
                res[name] = value[name]
            }
        }
        if (err.length > 0) return err
        return res
    }

    check(key, value, schema) {
        console.log({key, value, schema})
        const type = typeof value
        console.log(type)
        console.log(schema)
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
        required: true
    },
    age: {
        type: 'number'
    }
}
let y = x.validate({name: 'udin', age: 20})
console.log(y)