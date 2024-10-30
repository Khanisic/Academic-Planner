import { json } from '@sveltejs/kit';


import connectDB from '../../../db/db';
import Concentration from '../../../db/models/concentrations.model';


export async function POST({ request }) {
    await connectDB();
    const { concentration_name,
        concentration_about,
        concentration_dept,
        concentration_level,
        concentration_required_courses,
        concentration_elective_courses,
        concentration_credit_hours
    } = await request.json();

    try {
        const newCourse = await Concentration.create({
            concentration_name,
            concentration_about,
            concentration_level,
            concentration_required_courses,
            concentration_dept,
            concentration_elective_courses,
            concentration_credit_hours
        });
        return json(newCourse, { status: 201 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}

export async function GET({ url }) {
    await connectDB();


    try {
        const concentrations = await Concentration.find();

        return json(concentrations, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}

export async function PUT({ request }) {
    await connectDB();

    const {
        id, 
        concentration_name,
        concentration_about,
        concentration_level,
        concentration_required_courses,
        concentration_dept,
        concentration_elective_courses,
        concentration_credit_hours
    } = await request.json();

    if (!id) {
        return json({ message: 'Program ID is required for updating' }, { status: 400 });
    }

    try {
        const updatedConcentration = await Concentration.findByIdAndUpdate(
            id,
            {
                concentration_name,
                concentration_about,
                concentration_level,
                concentration_required_courses,
                concentration_dept,
                concentration_elective_courses,
                concentration_credit_hours
            },
            { new: true } // Return the updated document
        );

        if (!updatedConcentration) {
            return json({ message: 'Concentration not found' }, { status: 404 });
        }

        return json(updatedConcentration, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}


