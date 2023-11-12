import bcrypt from 'bcrypt'
import { PassportStatic } from 'passport'
import { IVerifyOptions, Strategy } from 'passport-local'
import { users } from '../main'

type Done = (error: any, user?: false | Express.User, options?: IVerifyOptions) => void

// declaration merging
// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
declare global {
  namespace Express {
    interface User {
      email: string;
      password: string;
      id?: string | undefined;
    }
  }
}

const init = (passport: PassportStatic) => {
  const authenticateUser = async (email: string, password: string, done: Done) => {
    const user = getUserByEmail(email)

    if (!user) {
      return done(null, false, { message: 'No user with this email' })
    }

    try {
      //varify password
      return (await bcrypt.compare(password, user.password))
        ? done(null, user)
        : done(null, false, { message: 'Password Incorrect.' })
    } catch (e) {
      console.log(e)
      return done(e)
    }
  }
  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id as string)))
}


export default init

const getUserByEmail = (_email: string) => {
  return users.find(user => user.email === _email) ?? null
}

const getUserById = (_id: string) => {
  return users.find(user => user.id === _id) ?? null
}