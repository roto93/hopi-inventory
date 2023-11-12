import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { users } from '../main'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userFound = users.find(i => i.email === email)

  if (userFound) {
    const message = 'You are already registered before. Please sign in.'
    res.status(201).json({ message })
    return
  }

  // create new user
  const hashedPassword = await bcrypt.hash(password, 10)
  users.push({
    id: Date.now().toString(),
    email,
    password: hashedPassword
  })

  const message = 'Sign up successfully.'
  res.status(201).json({ message })
}


export const loginSuccess = async (req: Request, res: Response) => {
  const message = 'Logged in!'
  res.status(200).json({ message })
}


export const loginFailed = async (req: Request & { session: { messages: string } }, res: Response) => {
  res.status(401).json({
    status: 'Failed',
    message: req.flash('error')
  })
}