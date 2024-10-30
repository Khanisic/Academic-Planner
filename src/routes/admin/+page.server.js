// src/routes/admin/program/[id]/+page.server.js
import { json } from '@sveltejs/kit';
import Program from '../../db/models/programs.model'
import Semester from '../../db/models/semester.model'
import connectDB from '../../db/db';
export async function load({ fetch }) {

    await connectDB();
    let programs;
    let semesters;
    try {
        programs = await Program.find().lean();
        semesters = await Semester.find().lean();

    } catch (error) {

        return {
            error: error.message
        };
    }

    return {
        programs: JSON.parse(JSON.stringify(programs)),
        semesters: JSON.parse(JSON.stringify(semesters))
    };

}
