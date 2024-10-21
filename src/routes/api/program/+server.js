// src/routes/api/todos/+server.js
import { json } from '@sveltejs/kit';

import Program from '../../../db/models/programs.model';
import connectDB from '../../../db/db';


export async function POST({ request }) {
    await connectDB();
    const { program_name,
        program_dept,
        program_required_courses,
        program_hours,
        program_maximum_concentrations,
        program_minimum_concentrations,
        program_concentrations,
        program_desc,
        program_core_requirements,
        program_requirements,
        program_visa_requirements,
        program_concentration_requirements,
        program_level } = await request.json();

    try {
        const newProgram = await Program.create({
            program_name,
            program_dept,
            program_required_courses,
            program_hours,
            program_maximum_concentrations,
            program_minimum_concentrations,
            program_concentrations,
            program_desc,
            program_core_requirements,
            program_requirements,
            program_visa_requirements,
            program_concentration_requirements,
            program_level
        });
        return json(newProgram, { status: 201 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}
