import Course from '../../../../db/models/course.model'
import { json } from '@sveltejs/kit';
import connectDB from '../../../../db/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { course_id } = params;
    await connectDB();

    // eslint-disable-next-line no-useless-catch
    try {
        let course = await Course.findById(course_id)

        if (!course) {
            throw new Error('Program not found');
        }

        // Convert ObjectIds to strings
        course = JSON.parse(JSON.stringify(course));

        return { course };
    } catch (error) {
        throw error;
    }
}
