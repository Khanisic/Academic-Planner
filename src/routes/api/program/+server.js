
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


export async function GET() {
    await connectDB();

    try {
        const programs = await Program.find(); // Fetch all programs from the database
        return json(programs, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}


export async function PUT({ request }) {
    await connectDB();

    const {
        id, // Program ID
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
    } = await request.json();


    console.log("Server ----------------- ",program_concentrations)

    
    if (!id) {
        return json({ message: 'Program ID is required for updating' }, { status: 400 });
    }

    try {
        const updatedProgram = await Program.findByIdAndUpdate(
            id,
            {
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
            },
            { new: true } // Return the updated document
        );

        if (!updatedProgram) {
            return json({ message: 'Program not found' }, { status: 404 });
        }

        return json(updatedProgram, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE({ request }) {
    await connectDB();

    const { id } = await request.json(); 

    if (!id) {
        return json({ message: 'Program ID is required for deleting' }, { status: 400 });
    }

    try {
        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return json({ message: 'Program not found' }, { status: 404 });
        }

        return json({ message: 'Program deleted successfully' }, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}