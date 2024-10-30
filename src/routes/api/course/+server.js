
import { json } from '@sveltejs/kit';

import Course from '../../../db/models/course.model';
import connectDB from '../../../db/db';


export async function POST({ request }) {
    await connectDB();
    const { course_title,
        course_code,
        course_dept,
        course_description,
        course_level,
        course_credit_hours,
     } = await request.json();

    try {
        const newCourse = await Course.create({
            course_title,
            course_code,
            course_dept,
            course_description,
            course_level,
            course_credit_hours,
        });
        return json(newCourse, { status: 201 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}


export async function PUT({ request }) {
    await connectDB();

    const {
        id, 
        course_title,
        course_code,
        course_dept,
        course_description,
        course_level,
        course_credit_hours,
    } = await request.json();

    if (!id) {
        return json({ message: 'Course ID is required for updating' }, { status: 400 });
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                course_title,
                course_code,
                course_dept,
                course_description,
                course_level,
                course_credit_hours,
            },
            { new: true } 
        );

        if (!updatedCourse) {
            return json({ message: 'Concentration not found' }, { status: 404 });
        }

        return json(updatedCourse, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}


export async function GET({ url }) {
    await connectDB();

    const dept = url.searchParams.get('dept');         // Optional department filter

    try {
        const filter = dept ? { course_dept: dept } : {};
        const courses = await Course.find(filter).sort({course_code : 1});
        return json(courses, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}