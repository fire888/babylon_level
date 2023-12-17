import { Class1 } from './class1'
import { Class2 } from './Class2'
const conf1 = { constr: Class1 }
const conf2 = { constr: Class2 }

const arr = [
    { key: 'aaa', data: conf1 },
    { key: 'bbb', data: conf2 },
]

const m = {
    'aaa': new Class1(conf1),
    'bbb': new Class2(conf1),
}

console.log('---', m.aaa.aaa)


