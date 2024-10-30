import mongoose from 'mongoose';

const CourseOfferedSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    season: { type: String, required: true },
    year: { type: String, required: true },
});

const CourseOffered = mongoose.models.CourseOffered || mongoose.model('CourseOffered', CourseOfferedSchema);

export default CourseOffered;