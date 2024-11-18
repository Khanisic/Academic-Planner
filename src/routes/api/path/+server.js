import { json } from "@sveltejs/kit";
import connectDB from "../../../db/db";
import Program from "../../../db/models/programs.model";



export async function GET({ url }) {
    await connectDB();


    const course = url.searchParams.get('course');
    const degree = url.searchParams.get('degree');

    try {
        const programs = await Program.find({
            program_dept: course,
            program_level: degree == 'master' ? 'Graduate' : 'Undergraduate'
        });

        return json({programs},{ status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}