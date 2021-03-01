const test = (text, time = 1000, callback) => {
    const arrayOfWords = text.split(' ');
    let index = 0;
    let Interval = setInterval( (words) => {

        if (index < words.length) {
            console.log( words[index] );
            index++;
        } else {
            clearInterval(Interval);
            callback(arrayOfWords.length)
        }
    }, time, arrayOfWords)
}

test('Hola vengo a flotar', undefined, (count) => {
    let total = count;
    test('Soy solo un texto de prueba', 500, (count) => {
        total += count;
        test('Ia casi termina de correr el codigo', 1500, (count) => {
            total += count;
            console.log('Proceso Completo');
            console.log(total);
        });
    });
});
