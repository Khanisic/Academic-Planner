
import Faculty from '../../../../db/models/faculty.model'
import { departments } from '../../../../lib/assets/departments';
import { json } from '@sveltejs/kit';
import connectDB from '../../../../db/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { department_code } = params;
    await connectDB();

    const department = departments.filter((dept) => dept.code == department_code)
   
    // eslint-disable-next-line no-useless-catch
    try {
        let professors = await Faculty.find({
            faculty_dept: `${department[0].code} ${department[0].name}`
        })


        if (!professors) {
            throw new Error('Faculty not found');
        }

        professors = JSON.parse(JSON.stringify(professors));

        return { professors, department: department[0] };
    } catch (error) {
        throw error;
    }
}

