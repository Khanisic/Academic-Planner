import mongoose from 'mongoose';

const ConcentrationSchema = new mongoose.Schema({
    concentration_name: { type: String, required: true },
    concentration_about: { type: String, required: true },
    concentration_dept: { type: String, required: true },
    concentration_level: { type: String, required: true },
    concentration_required_courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    ],
    concentration_elective_courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    ],
    concentration_credit_hours: { type: Number, required: true },
});

const Concentration = mongoose.models.Concentration || mongoose.model('Concentration', ConcentrationSchema);

export default Concentration;