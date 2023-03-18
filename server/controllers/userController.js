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
      return res.status(401).json(false);
    }
    res.status(200).json(user.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a User Info by ID
const getUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findById(req.body.userId);
    res.status(200).json(userInfo);
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
      const user = await new User({
        firstName,
        lastName,
        goal,
        pronounce,
        email,
        password,
        routines: [],
        totalCount: 0,
      });

      user.save(function (err) {
        if (err) {
          console.error(err);
        } else {
          res.status(200).json(user._id);
          console.log('User saved successfully!');
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User's Routines
const updateRoutines = async (req, res) => {
  try {
    const { userId, newRoutines } = req.body;
    await User.findByIdAndUpdate(
      userId,
      { $set: { routines: newRoutines } },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User's Routine
const updateRoutine = async (req, res) => {
  try {
    const { userId, routineId, newRoutine } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'routines._id': routineId },
      { $set: { 'routines.$': newRoutine } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'Routine not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete One of User's Routines
const deleteRoutine = async (req, res) => {
  try {
    const { userId, routineId } = req.body;
    console.log(userId, routineId);

    User.findByIdAndUpdate(
      userId,
      { $pull: { routines: { _id: routineId } } },
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
          // handle error
        } else {
          console.log(user);
          // the updated user object, without the deleted routine
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateRoutines,
  updateRoutine,
  deleteRoutine,
};
