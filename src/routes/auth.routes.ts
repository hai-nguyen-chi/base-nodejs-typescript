import express, { response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '~/models/database/User'
import { registerValidator } from '~/validations/auth'
import { errorMsgDto } from '~/utils/format'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { error } = registerValidator(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const checkEmailExist = await User.findOne({ email: req.body.email })
  if (checkEmailExist) {
    return res.status(400).send(errorMsgDto('Email is already'))
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const newUser = await user.save()
    res.send(newUser)
  } catch (err: any) {
    response.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).send(errorMsgDto('Email or password incorrect'))
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password)
  if (!checkPassword) {
    return res.status(404).send(errorMsgDto('Email or password incorrect'))
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN as string, { expiresIn: 60 * 60 * 24 })
  response.header('token', token).send(token)
})

export default router
