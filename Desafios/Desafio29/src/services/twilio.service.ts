import twilio from 'twilio'

const accountSid = 'ACe00385283ef806adeaee7c8b760b96ea';
const authToken = '362414755ff6b1fb97030e4799561c60';

const client = twilio(accountSid, authToken)

export const enviarSMS = async (msg,number) => {
    try {    
        let aux = await client.messages.create({
            body: msg,
            from: '+19493442494',
            to: number
        })
        return aux
    }
    catch(error) {
        return error
    }
}