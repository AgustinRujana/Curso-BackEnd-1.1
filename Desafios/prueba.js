function createPhoneNumber(numbers){
  return `(${numbers.split('', 3).join('')}) ${numbers.split('', 3).join('')}-${numbers.split('', 4).join('')}`
}