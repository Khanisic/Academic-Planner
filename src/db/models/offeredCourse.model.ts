import mongoose from 'mongoose';

const CourseOfferedSchema = new mongoose.Schema({
    course_details : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    course_dept : { type: String, required: true },
    course_code : { type: String, required: true },
    faculty : { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    semester : { type: String, required: true },
    year : { type: String, required: true },
});

const CourseOffered = mongoose.models.CourseOffered || mongoose.model('CourseOffered', CourseOfferedSchema);

export default CourseOffered;