import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  goal: { type: String, required: true },
  pronounce: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joiningDate: { type: String, required: true },
  totalCount: { type: Number, required: true },
  routines: [
    {
      routineName: String,
      rotuine: [String],
      prevPerformance: [{ exercise: String, reps: [Number], weight: [Number] }],
    },
  ],
});

const User = mongoose.model('User', userSchema);

async function seedTestUser() {
  try {
    const testUser = {
      firstName: 'test',
      lastName: 'park',
      goal: 'yay',
      pronounce: 'he/him',
      email: 'elvintern@gmail.com',
      password: '123123',
      joiningDate: '1-2-2023',
      totalCount: 2,
      routines: [
        {
          routineName: 'backday',
          rotuine: ['deadlift', 'let pull down', 'seated row'],
          prevPerformance: [
            {
              exercise: 'deadlift',
              reps: [10, 10, 10, 10],
              weight: [50, 60, 70, 80],
            },
            {
              exercise: 'let pull down',
              reps: [10, 10, 10, 10],
              weight: [50, 60, 70, 80],
            },
            {
              exercise: 'seated row',
              reps: [10, 10, 10, 10],
              weight: [50, 60, 70, 80],
            },
          ],
        },
      ],
    };

    await User.create(testUser, (err, savedUsers) => {
      if (err) {
        console.error(err);
      } else {
        console.log(savedUsers);
      }
    });
    const checkTestUser = await User.find({});
    console.log(checkTestUser);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteUsers() {
  try {
    await User.deleteMany({});
    const checkTestUser = await User.find({});
    console.log(checkTestUser);
  } catch (error) {
    console.log(error.message);
  }
}

export default User;
export { seedTestUser, deleteUsers };
