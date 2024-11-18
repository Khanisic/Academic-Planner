
import { json } from '@sveltejs/kit';
import connectDB from '../../../db/db';
import Program from '../../../db/models/programs.model';
import Course from '../../../db/models/course.model';
import Concentration from '../../../db/models/concentrations.model';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { id } = params;
    await connectDB();

    // eslint-disable-next-line no-useless-catch
    try {
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
                model: Concentration,
                populate: [
                    { path: 'concentration_required_courses', model: Course },
                    { path: 'concentration_elective_courses', model: Course }
                ]
            })

            .lean();

        if (!program) {
            throw new Error('Program not found');
        }

        // Convert ObjectIds to strings
        program = JSON.parse(JSON.stringify(program));

        return { program };
    } catch (error) {
        throw error;
    }
}

