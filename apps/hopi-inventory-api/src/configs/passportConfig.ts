import bcrypt from 'bcrypt'
import { PassportStatic } from 'passport'
import { IVerifyOptions, Strategy } from 'passport-local'
import UserModel from '../models/UserModel'

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
    const user = await getUserByEmail(email)

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
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id as string)))
}


export default init

const getUserByEmail = async (_email: string) => {
  const user = await UserModel.find({ email: _email })
  return user?.[0] ?? null
}

export const getUserById = async (_id: string) => {
  const user = await UserModel.findById(_id)
  return user.toJSON() ?? null
}
