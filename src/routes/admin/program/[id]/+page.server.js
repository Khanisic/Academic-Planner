import Program from '../../../../db/models/programs.model';
import Course from '../../../../db/models/course.model';
import Concentration from '../../../../db/models/concentrations.model';
import connectDB from '../../../../db/db';
import { checkAuth } from '$lib/server/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    checkAuth(cookies);
    
    const { id } = params;
    await connectDB();

    let program = await Program.findById(id)
        .populate({
            path: 'program_required_courses.required_course',
            model: Course
        })
        .populate({
            path: 'program_required_courses.altername_course',
            model: Course
        })
        .populate({
            path: 'program_concentrations',
            model: Concentration
        })
        .lean();

    if (!program) {
        throw new Error('Program not found');
    }

    program = JSON.parse(JSON.stringify(program));

    return { program };
}

