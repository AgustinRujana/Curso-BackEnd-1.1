import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'micah.adams@ethereal.email',
        pass: 'Dq79WVUxZExU1pkXG7'
    }
});

export const enviarMail = (asunto,mensaje,cb) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: 'ford.blanda@ethereal.email',
        subject: asunto,
        html: mensaje
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        cb(err,info)
    })
}