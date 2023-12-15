export const setUser = (id: string) => {
  localStorage.setItem('userID', id)
}

export const getUser = () => {
  return localStorage.getItem('userID')
}

export const logoutUser = () => {
  localStorage.removeItem('userID')
}