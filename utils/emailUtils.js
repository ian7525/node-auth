import nodeMailer from 'nodemailer'

const emailUtils = () => {
  let transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PWD,
    },
  })

  const send = async ({
    from = process.env.EMAIL_USER,
    to,
    subject = process.env.EMAIL_TITLE,
    text = process.env.EMAIL_TEXT,
  }) => {
    return new Promise((resolve, reject) => {
      transport.sendMail(
        {
          from,
          to,
          subject,
          text,
        },
        (err, info) => {
          if (err) {
            reject(err)
          } else {
            resolve(info)
          }
        }
      )
    })
  }

  return {
    registerEmail: async (to) => {
      try {
        const message = await send({ to })
        return { isSuccess: true, message }
      } catch (err) {
        return { isSuccess: false, message: 'Email sent failed' }
      }
    },
  }
}

export default emailUtils
