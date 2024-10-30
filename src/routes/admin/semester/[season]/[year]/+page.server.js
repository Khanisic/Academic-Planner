// src/routes/admin/program/[id]/+page.server.js
import { json } from '@sveltejs/kit';
import Semester from '../../../../../db/models/semester.model';


export async function load({ params }) {
    const { season, year } = params;

    let semester;

    try {
        semester = await Semester.findOne({
            season, year
        }).populate({
            path: 'course_offerings',
            model: 'CourseOffered',
            populate: [
                { path: 'course', model: 'Course' },
                { path: 'faculty', model: 'Faculty' }
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