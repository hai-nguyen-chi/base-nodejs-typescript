import express from 'express'
import User from '~/models/database/User'
import { verifyToken } from '~/middlewares/auth.middlewares'

const router = express.Router()

router.get('/users', verifyToken, async (req, res) => {
  const users = await User.find({})
  return res.status(200).send(users)
})

export default router
