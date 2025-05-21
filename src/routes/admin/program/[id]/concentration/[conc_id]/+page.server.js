import Concentration from '../../../../../../db/models/concentrations.model'
import connectDB from '../../../../../../db/db'
import Course from '../../../../../../db/models/course.model';
import { checkAuth } from '$lib/server/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    checkAuth(cookies);
    
    const { conc_id } = params;
    await connectDB();

    let concentration = await Concentration.findById(conc_id)
        .populate({
            path: 'concentration_required_courses',
            model: Course
        })
        .populate({
            path: 'concentration_elective_courses',
            model: Course
        })

    if (!concentration) {
        throw new Error('Program not found');
    }

    concentration = JSON.parse(JSON.stringify(concentration));

    return { concentration };
}

