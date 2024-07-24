export const allAccess = (req, res) => {
  res.status(200).json({ message: 'Public Content.' })
}

export const userBoard = (req, res) => {
  res.status(200).json({ message: 'User Content.' })
}

export const adminBoard = (req, res) => {
  res.status(200).json({ message: 'Admin Content.' })
}
