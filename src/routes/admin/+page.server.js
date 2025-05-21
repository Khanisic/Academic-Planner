// src/routes/admin/+page.server.js


import Program from '../../db/models/programs.model'
import Semester from '../../db/models/semester.model'
import connectDB from '../../db/db';
import { checkAuth } from '$lib/server/auth';

export async function load({ cookies }) {
    checkAuth(cookies, true);
    
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
