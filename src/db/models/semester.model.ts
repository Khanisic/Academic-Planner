import mongoose from 'mongoose';

const SemesterSchema = new mongoose.Schema({
    year: { type: String, required: true },
    semester_dept: { type: String, required: true },

    season: { type: String, required: true },
    course_offerings: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'CourseOffered', required: true
    }],
});

const Semester = mongoose.models.Semester || mongoose.model('Semester', SemesterSchema);

export default Semester;