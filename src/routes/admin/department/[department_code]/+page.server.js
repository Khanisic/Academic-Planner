import Faculty from '../../../../db/models/faculty.model'
import { departments } from '../../../../lib/assets/departments';
import connectDB from '../../../../db/db';
import { checkAuth } from '$lib/server/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    checkAuth(cookies);
    
    const { department_code } = params;
    await connectDB();

    const department = departments.filter((dept) => dept.code == department_code)
   
    let professors = await Faculty.find({
        faculty_dept: `${department[0].code} ${department[0].name}`
    })

    if (!professors) {
        throw new Error('Faculty not found');
    }

    professors = JSON.parse(JSON.stringify(professors));

    return { professors, department: department[0] };
}

