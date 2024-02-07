import jwt from 'jsonwebtoken'
import { errorMsgDto } from '~/utils/format'

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.header('token')

  if (!token) return res.status(401).send(errorMsgDto('Access Denied'))

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN as string)
    next()
  } catch (err) {
    return res.status(400).send('Invalid Token')
  }
}

export { verifyToken }
