const RutaModulo = '/operaciones'

const operacion = async (num1: number, num2: number, op: string) => {
    let operacion = null

    switch (op.toLowerCase()){
        case 'resta':
            operacion = await import(RutaModulo).then(response => response.Resta)
            break
        case 'suma':
            operacion = await import(RutaModulo).then(response => response.Suma)
            break
        default:
            return console.log(`${op} no es una cuenta que sepamos resolver`)
    }
    return new operacion(num1,num2).resultado();
}

const operaciones = async (num1: number, num2: number, op: string) => {
    const resultado = await operacion(num1, num2, op)
    console.log(resultado)
}
