import User, { seedTestUser, deleteUsers } from '../mongodb/models/user.js';

// get all Users
const getUsers = async (req, res) => {
  try {
    seedTestUser();
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single quote

export { getUsers };
