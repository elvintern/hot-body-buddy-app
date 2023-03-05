import User, { seedTestUser, deleteUsers } from '../mongodb/models/user.js';

// Get all Users
const getUsers = async (req, res) => {
  try {
    deleteUsers();
    seedTestUser();
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single User
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

// Create a User
const createUser = async (req, res) => {
  try {
    const userCheck = await User.findOne({
      email: req.body.email,
    });

    if (userCheck) {
      return res.json(false);
    } else {
      const { firstName, lastName, goal, pronounce, email, password } =
        req.body;
      await User.create(
        {
          firstName,
          lastName,
          goal,
          pronounce,
          email,
          password,
          routines: [],
          totalCount: 0,
        },
        (err, doc) => {
          res.status(200).json(doc._id);
          console.log('User created successfully!');
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUsers, getUser, createUser };
