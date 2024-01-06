import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import User from '../models/UserModel'

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  // check if user exists
  // const userFound = users.find(i => i.email === email)
  const userFound = await (await User.find({ email })).length > 0
  if (userFound) {
    const message = 'You are already registered before. Please sign in.'
    //https://stackoverflow.com/questions/9269040/which-http-response-code-for-this-email-is-already-registered
    res.status(200).json({ status: 'Success', message })
    return
  }

  // create new user
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ email, password: hashedPassword, username })
    console.log('New User ID: ', newUser.id)
    const message = 'Sign up successfully.'
    res.status(201).json({ status: 'Success', message })
  } catch (e) {
    console.error(e)
    res.status(500).json({ status: 'Failed', message: 'Error occured when creating new user. ' + e.message })
    return
  }

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
  res.status(200).json({ status: 'Success', message, userID: user.id })
}


export const loginFailed = async (req: Request & { session: { messages: string } }, res: Response, next: NextFunction) => {
  const error = req.flash('error')
  req.logout((e) => {
    if (e) next(e)
    res.status(401).json({
      status: 'Failed',
      message: error
    })
  })
}


export const testPrivate = async (req: Request & { session: { messages: string } }, res: Response) => {
  res.status(200).json({ status: 'Success', message: 'ok' })
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  console.log(req.flash('error'))
  res.redirect('/auth/loginFailed');
}