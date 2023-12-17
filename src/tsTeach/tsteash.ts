import './conf'

function simpleDecorator(constructor: Function) {
   // console.log('$%$%$%4 simpleDecorator', constructor)
   // console.log('$%$%$%4 simpleDecorator', constructor.name)
    constructor.prototype.aaa = 'CUSTOM PROP'
   // console.log(constructor.prototype.aaa)
   // console.log('$%$%$%4 simpleDecorator', constructor)
}
function secondDecorator(constructor: Function) {
   // console.log('$%$%$%4---- secondDecorator')
}
function createThirdDecorator(name: string) {
    return function (constructor: Function) {
     //   console.log('$%$%$%4---- ThirdDecorator', name)
    }
}
function propDesc (target: any, propKey: string) {
    //console.log('propKey', target, propKey)
}
function methodDesc(target: any, methodName: string, propDesc?: PropertyDescriptor) {
    console.log('methodDesc', target, methodName, propDesc)

    const audit = function (this: any) {
        //console.log('1111')
        //target[methodName].apply(this, arguments)
    }
    target[methodName] = audit
    return target
}

@simpleDecorator
@secondDecorator
@createThirdDecorator('AAAA')
class ClWithDecorator {
    @propDesc
    static ddd: string

    @propDesc
    nnn: string

    @methodDesc
    doAny(): void {
        console.log('doAny')
    }
}

const a = new ClWithDecorator()
a.doAny()
a.doAny()


class Cont<T> {
    concatArray(arr: Array<T>):string {
        return arr.join('')
    }
}
const s = new Cont<string>()
const cc = s.concatArray(['a', 'a', 'a'])
console.log('^^^^^', cc)

const s1 = new Cont<number>()
const cc1 = s1.concatArray([1, 1, 1])
//const cc2 = s1.concatArray(['a', 'a', 'a'])
//console.log('^^^^^', cc2)

type dateNumberOrString<T> = 
    T extends Date 
        ? Date
        : T extends number 
            ? Date | number 
            : T extends string
                ? Date | number | string 
                : never
            
function compareValues<T extends string | number | Date | boolean>(input: T, compareTo: dateNumberOrString<T>): void {
    console.log(input, compareTo)
}

compareValues(new Date(), new Date())
