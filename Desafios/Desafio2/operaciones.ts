interface operaciones {
    resultado(): Promise<any>;
}

class Suma implements operaciones{

    private readonly num1: number;
    private readonly num2: number;

    constructor(num1: number, num2: number) {
        this.num1 = num1;
        this.num2 = num2;
    }
    
    public async resultado(): Promise<number>{
        return this.num1 + this.num2;
    }

}

class Resta implements operaciones{
    private readonly num1: number;
    private readonly num2: number;

    constructor(num1: number, num2: number) {
        this.num1 = num1;
        this.num2 = num2;
    }
    
    public async resultado(): Promise<number>{
        return this.num1 - this.num2;
    }
}

export = {
    Suma,
    Resta
}