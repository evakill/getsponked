import mongoose from 'mongoose';
if (!process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh?');
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI);

const taskSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Group', 'Challenge', 'Individual']
  },
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
});


const Task = mongoose.model('Task', taskSchema);

export default Task;
