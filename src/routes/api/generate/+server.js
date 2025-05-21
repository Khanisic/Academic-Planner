import { json } from "@sveltejs/kit";
import connectDB from "../../../db/db";

import Course from "../../../db/models/course.model";
import CourseOffered from "../../../db/models/offeredCourse.model";
import Semester from "../../../db/models/semester.model";
import Faculty from "../../../db/models/faculty.model";



export async function POST({ request }) {

    console.log("-------------------------------------------- Starting -----------------------------------")
    await connectDB();

    try {
        const { courses } = await request.json();

        if (!Array.isArray(courses)) {
            return json({ error: 'Invalid data format. Expected an array of courses.' }, { status: 400 });
        }

        const courseData = [];
        const allProfessors = []
        let courseCounter = 0; // Add counter for unique IDs

        for (let courseTitle of courses) {
            // Assuming the format '571 : Database Management Systems'
            const [code, title] = courseTitle.split(' : ').map(part => part.trim());

            // Find the course document by title
            const course = await Course.findOne({ course_title: title });

            if (!course) {
                console.warn(`Course not found: ${title}`);
                continue; // Skip if course not found
            }

            // Find all offerings of the course
            const offerings = await CourseOffered.find({ course: course._id })
                .populate({
                    path: 'faculty',
                    model: Faculty
                })
                .populate({
                    path: 'course',
                    model: Course
                })
                .lean();

            if (offerings.length === 0) {
                console.warn(`No offerings found for course: ${title}`);
            }

            // Initialize counters and professor lists
            const fallProfessors = [];
            const springProfessors = [];
            const summerProfessors = [];
            const januaryProfessors = [];

            // Iterate through each offering to gather data
            for (let offer of offerings) {
                // Find the semester that includes this course offering
                const semester = await Semester.findOne({ course_offerings: offer._id, })
                if (!semester) {
                    console.warn(`Semester not found for course offering: ${offer._id}`, course.course_title);
                    continue; // Skip if semester not found
                }

                const season = semester.season.toLowerCase();

                if (season === 'fall') {
                    if (!allProfessors.includes(offer.faculty.name) && offer.faculty.active) {
                        allProfessors.push(offer.faculty.name)
                    }
                    fallProfessors.push({
                        faculty: offer.faculty.name,
                        year: semester.year,
                        season: semester.season,
                        active: offer.faculty.active
                    });
                } else if (season === 'spring') {
                    if (!allProfessors.includes(offer.faculty.name) && offer.faculty.active) {
                        allProfessors.push(offer.faculty.name)
                    }
                    springProfessors.push({
                        faculty: offer.faculty.name,
                        year: semester.year,
                        season: semester.season,
                        active: offer.faculty.active
                    });
                } else if (season === 'summer') {
                    if (!allProfessors.includes(offer.faculty.name) && offer.faculty.active) {
                        allProfessors.push(offer.faculty.name)
                    }
                    summerProfessors.push({
                        faculty: offer.faculty.name,
                        year: semester.year,
                        season: semester.season,
                        active: offer.faculty.active
                    });
                } else if (season === 'january') {
                    if (!allProfessors.includes(offer.faculty.name) && offer.faculty.active) {
                        allProfessors.push(offer.faculty.name)
                    }
                    januaryProfessors.push({
                        faculty: offer.faculty.name,
                        year: semester.year,
                        season: semester.season,
                        active: offer.faculty.active
                    });
                }
            }

            // Calculate availability percentages
            const totalFallSemesters = 3; // Total number of fall semesters in our data
            const totalSpringSemesters = 3; // Total number of spring semesters in our data
            const totalSummerSemesters = 3; // Total number of summer semesters in our data
            const totalJanuarySemesters = 3; // Total number of january semesters in our data

            // Get unique year-semester combinations with at least one active professor
            const activeFallSemesters = new Set(
                fallProfessors
                    .filter(prof => prof.active)
                    .map(prof => `${prof.year}-${prof.season}`)
            );

            const activeSpringSemesters = new Set(
                springProfessors
                    .filter(prof => prof.active)
                    .map(prof => `${prof.year}-${prof.season}`)
            );

            const activeSummerSemesters = new Set(
                summerProfessors
                    .filter(prof => prof.active)
                    .map(prof => `${prof.year}-${prof.season}`)
            );

            const activeJanuarySemesters = new Set(
                januaryProfessors
                    .filter(prof => prof.active)
                    .map(prof => `${prof.year}-${prof.season}`)
            );

            const fallAvailability = activeFallSemesters.size / totalFallSemesters;
            const springAvailability = activeSpringSemesters.size / totalSpringSemesters;
            const summerAvailability = activeSummerSemesters.size / totalSummerSemesters;
            const januaryAvailability = activeJanuarySemesters.size / totalJanuarySemesters;

            courseData.push({
                id: `${course._id}-${courseCounter++}`, // Create unique ID using counter
                course: `${course.course_dept} ${code} : ${title}`,
                course_details: course,
                fall_availability: parseFloat(fallAvailability.toFixed(2)),
                spring_availability: parseFloat(springAvailability.toFixed(2)),
                summer_availability: parseFloat(summerAvailability.toFixed(2)),
                january_availability: parseFloat(januaryAvailability.toFixed(2)),
                fall_professors: fallProfessors,
                spring_professors: springProfessors,
                summer_professors: summerProfessors,
                january_professors: januaryProfessors,
            });
        }

        return json({ courseData, allProfessors });

    } catch (error) {
        console.error('Error in /api/generate:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}