const allAccess = (req, res) => {
  res.status(200).json({ message: 'Public Content.' })
}

const userBoard = (req, res) => {
  res.status(200).json({ message: 'User Content.' })
}

const moderatorBoard = (req, res) => {
  res.status(200).json({ message: 'Moderator Content.' })
}

const adminBoard = (req, res) => {
  res.status(200).json({ message: 'Admin Content.' })
}

module.exports = {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
}
