import Program from '../../../../db/models/programs.model';
import Course from '../../../../db/models/course.model';
import Concentration from '../../../../db/models/concentrations.model';
import connectDB from '../../../../db/db';
import { json } from '@sveltejs/kit';

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
                model: Concentration
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

