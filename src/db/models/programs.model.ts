import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
    program_name: { type: String, required: true },
    program_dept: { type: String, required: true },
    program_required_courses: [{
        required_course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        altername_course: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false
        },
    }],
    program_hours: { type: Number, required: true },
    program_maximum_concentrations: { type: Number, required: true },
    program_minimum_concentrations: { type: Number, required: true },
    program_concentrations: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Concentration', required: true
    }],
    program_desc: { type: String, required: true },
    program_core_requirements: { type: String, required: true },
    program_requirements: { type: String, required: true },
    program_visa_requirements: { type: String, required: true },
    program_concentration_requirements: { type: String, required: true },
    program_level: { type: String, required: true },

});

const Program = mongoose.models.Program || mongoose.model('Program', ProgramSchema);

export default Program;