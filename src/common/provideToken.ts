import * as jwt from 'jsonwebtoken'

function provideToken(index) {
  return jwt.sign({id: index}, process.env.MY_SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24
  })
}

export default provideToken