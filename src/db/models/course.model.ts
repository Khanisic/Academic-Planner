import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    course_title: { type: String, required: true, unique: true },
    course_code: { type: String, required: true, unique: true },
    course_dept: { type: String, required: true },
    course_description: { type: String, required: true },
    course_level: { type: String, required: true },
    course_credit_hours: { type: Number, required: true },
    course_prereq: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;