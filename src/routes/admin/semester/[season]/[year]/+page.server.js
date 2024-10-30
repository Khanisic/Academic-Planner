// src/routes/admin/program/[id]/+page.server.js
import { json } from '@sveltejs/kit';
import Semester from '../../../../../db/models/semester.model';
import Course from '../../../../../db/models/course.model';
import Faculty from '../../../../../db/models/faculty.model';
import CourseOffered from '../../../../../db/models/offeredCourse.model';

import connectDB from '../../../../../db/db';

export async function load({ params }) {
    await connectDB();
    const { season, year } = params;

    let semester;

    try {
        semester = await Semester.findOne({
            season, year
        }).populate({
            path: 'course_offerings',
            model: CourseOffered,
            populate: [
                { path: 'course', model: Course },
                { path: 'faculty', model: Faculty }
            ]
        })



    } catch (error) {
 
        return {
            error: error.message
        };
    }

    return {
        semester: JSON.parse(JSON.stringify(semester))
    };

}