
import { json } from '@sveltejs/kit';

import Program from '../../../db/models/programs.model';
import connectDB from '../../../db/db';
import Semester from '../../../db/models/semester.model';
import CourseOffered from '../../../db/models/offeredCourse.model';


export async function POST({ request }) {
    await connectDB();
    const { year,
        semester_dept,
        season,
        selectedOfferings_api } = await request.json();

    try {
        
        const courseOfferingIds = await Promise.all(selectedOfferings_api.map(async (offering) => {
            const newOffering = await CourseOffered.create({
                course: offering.course,
                faculty: offering.faculty,
                season,
                year,
            });
            return newOffering._id;
        }));

        const newSemester = await Semester.create({
            year,
            semester_dept,
            season,
            course_offerings: courseOfferingIds,
        });

        return json(newSemester, { status: 201 });
    } catch (error) {
        console.error("Error creating semester:", error.message);
        return json({ message: error.message }, { status: 500 });
    }
}


export async function GET() {
    await connectDB();

    try {
        const programs = await Program.find(); // Fetch all programs from the database
        return json(programs, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}


export async function PUT({ request }) {
    await connectDB();
    const { id, year, semester_dept, season, selectedOfferings_api } = await request.json();

    if (!id) {
        return json({ message: 'Semester ID is required for updating' }, { status: 400 });
    }

    try {
        // Fetch the existing semester with course offerings populated
        const existingSemester = await Semester.findById(id).populate('course_offerings');
        if (!existingSemester) {
            return json({ message: 'Semester not found' }, { status: 404 });
        }

        // Map current course offerings in the semester
        //const existingOfferingIds = new Set(existingSemester.course_offerings.map(offering => offering._id.toString()));

        // Separate offerings into those to keep, add, and delete
        const newOfferings = [];
        const updatedOfferings = [];
        const offeringsToDelete = [];

        // Check for new and existing offerings
        for (const offering of selectedOfferings_api) {
            const existingOffering = existingSemester.course_offerings.find(
                (existing) =>
                    existing.course.toString() === offering.course &&
                    existing.faculty.toString() === offering.faculty
            );

            if (existingOffering) {
                updatedOfferings.push(existingOffering._id);
            } else {
                // New offering: create a CourseOffered document
                const newOffering = await CourseOffered.create({
                    course: offering.course,
                    faculty: offering.faculty,
                    season,
                    year,
                });
                newOfferings.push(newOffering._id);
            }
        }

        // Identify offerings to delete
        for (const existing of existingSemester.course_offerings) {
            if (!updatedOfferings.includes(existing._id)) {
                offeringsToDelete.push(existing._id);
            }
        }

        // Remove the deleted offerings from CourseOffered collection
        await CourseOffered.deleteMany({ _id: { $in: offeringsToDelete } });

        // Update semester document with new, retained, and added offerings
        existingSemester.year = year;
        existingSemester.semester_dept = semester_dept;
        existingSemester.season = season;
        existingSemester.course_offerings = [...updatedOfferings, ...newOfferings];

        const updatedSemester = await existingSemester.save();

        return json(updatedSemester, { status: 200 });
    } catch (error) {
        console.error("Error updating semester:", error.message);
        return json({ message: error.message }, { status: 500 });
    }
}




export async function DELETE({ request }) {
    await connectDB();

    const { id } = await request.json();

    if (!id) {
        return json({ message: 'Semester ID is required for deleting' }, { status: 400 });
    }

    try {
        const deletedSemester = await Semester.findByIdAndDelete(id);

        if (!deletedSemester) {
            return json({ message: 'Semester not found' }, { status: 404 });
        }

        return json({ message: 'Semester deleted successfully' }, { status: 200 });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}