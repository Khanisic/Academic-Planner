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

    const department = url.searchParams.get('department');

    try {
        const concentrations = await Concentration.find();

        return json(concentrations, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}