import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    faculty_dept: { type: String, required: true },
    link: { type: String, required: true },
    active: { type: Boolean, required: true },
});

const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);

export default Faculty;