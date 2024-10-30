// src/routes/api/faculty/+server.js
import { json } from '@sveltejs/kit';
import Faculty from '../../../db/models/faculty.model';
import connectDB from '../../../db/db';

export async function POST({ request }) {
    await connectDB();
    const { name, faculty_dept, link, active } = await request.json();

    try {
        const newFaculty = await Faculty.create({ name, faculty_dept, link, active });
        return json(newFaculty, { status: 201 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}

export async function PUT({ request }) {
    await connectDB();
    const { id, name, faculty_dept, link, active } = await request.json();

    if (!id) {
        return json({ message: 'Faculty ID is required for updating' }, { status: 400 });
    }

    try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            id,
            { name, faculty_dept, link, active },
            { new: true }
        );

        if (!updatedFaculty) {
            return json({ message: 'Faculty not found' }, { status: 404 });
        }

        return json(updatedFaculty, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}

export async function GET({ url }) {
    await connectDB();

    const dept = url.searchParams.get('dept'); // Optional filter by department

    try {
        const filter = dept ? { faculty_dept: dept } : {};
        const faculties = await Faculty.find(filter).sort({ name: 1 });
        return json(faculties, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}
