const getOtherEmail = (user, currentUser) => {
  return user?.filter((user) => user !== currentUser.email)[0]
}

export default getOtherEmail
