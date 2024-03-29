import { Request, Response } from 'express'
import User from '../models/UserModel'

// get user object
export const getUser = async (req: Request, res: Response) => {
  const user = req.user
  const userObj = await User.findById(user.id).select(['username', 'email', 'eventIDs', 'avatar'])
  res.status(200).json({ status: 'Success', data: { user: userObj } })
}

// update user
export const updateUser = async (req: Request, res: Response) => {
  const user = req.user
  const { username, avatar } = req.body

  const isInvalid = (field: unknown) => field !== undefined && typeof field !== 'string'

  if (isInvalid(username) || isInvalid(avatar)) {
    res.status(400).json({ status: 'Failed', message: 'Wrong data type.' })
    return
  }

  try {
    const newUser = await User.findByIdAndUpdate(
      user.id,
      { username, avatar },
      { new: true }
    )
    res.status(200).json({ status: 'Success', message: 'User updated.', data: { user: newUser } })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}


// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const user = req.user
  const { id } = req.params

  // only oneself can delete user
  if (id !== user.id) {
    res.status(400).json({ status: 'Failed', message: 'You can\'t delete this account.' })
    return
  }

  try {
    const query = await User.findByIdAndDelete(id)
    res.status(200).json({ status: 'Success', message: 'User deleted.' })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ status: 'Failed', message: e.message })
  }

}
