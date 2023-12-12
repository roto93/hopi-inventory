import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { users } from '../main'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userFound = users.find(i => i.email === email)

  if (userFound) {
    const message = 'You are already registered before. Please sign in.'
    //https://stackoverflow.com/questions/9269040/which-http-response-code-for-this-email-is-already-registered
    res.status(200).json({ message })
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


export const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout((e) => {
    if (e) next(e)
    res.status(200).json({
      status: 'Success',
      message: 'Logged out!'
    })
  })
}


export const loginSuccess = async (req: Request, res: Response) => {
  const message = 'Logged in!'
  const user = req.user
  res.status(200).json({ message, userID: user.id })
}


export const loginFailed = async (req: Request & { session: { messages: string } }, res: Response, next: NextFunction) => {
  req.logout((e) => {
    if (e) next(e)
    res.status(401).json({
      status: 'Failed',
      message: req.flash('error')
    })
  })
}


export const testPrivate = async (req: Request & { session: { messages: string } }, res: Response) => {
  res.status(200).send('ok')
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.redirect('/auth/loginFailed');
}