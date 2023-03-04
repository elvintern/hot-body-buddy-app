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

// get a single User
const getUser = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({
      email: userEmail,
      password,
    });
    if (!user) {
      return res.status(404).json(false);
    }
    res.status(200).json(user.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUsers, getUser };
