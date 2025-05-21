import Course from '../../../../db/models/course.model'
import connectDB from '../../../../db/db';
import { checkAuth } from '$lib/server/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    checkAuth(cookies);
    
    const { course_id } = params;
    await connectDB();

    let course = await Course.findById(course_id)

    if (!course) {
        throw new Error('Program not found');
    }

    course = JSON.parse(JSON.stringify(course));

    return { course };
}
