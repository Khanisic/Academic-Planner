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
            let fallCount = 0;
            let springCount = 0;
            const fallProfessors = [];
            const springProfessors = [];


            // Iterate through each offering to gather data
            for (let offer of offerings) {
                // Find the semester that includes this course offering
                const semester = await Semester.findOne({ course_offerings: offer._id, })
                // console.log(course, "-----")
                // console.log(semester)
                if (!semester) {
                    console.warn(`Semester not found for course offering: ${offer._id}`, course.course_title);
                    continue; // Skip if semester not found
                }

                const season = semester.season.toLowerCase();

                if (season === 'fall') {
                    let alreadyPresentInFall = fallProfessors.filter((prof) => prof.year == semester.year && season == 'fall')
                    if (alreadyPresentInFall.length == 0) {
                        fallCount++;
                    }
                    if (!allProfessors.includes(offer.faculty.name) && offer.faculty.active) {
                        allProfessors.push(offer.faculty.name)
                    }
                    fallProfessors.push({
                        faculty: offer.faculty.name,
                        year: semester.year,
                        season: semester.season,
                        active : offer.faculty.active
                    });
                } else if (season === 'spring') {
                    let alreadyPresentInSpring = springProfessors.filter((prof) => prof.year == semester.year && season == 'spring')
                    if (alreadyPresentInSpring.length == 0) {
                        springCount++;
                    }
                    if (!allProfessors.includes(offer.faculty.name) && offer.faculty.active) {
                        allProfessors.push(offer.faculty.name)
                    }
                    springProfessors.push({
                        faculty: offer.faculty.name,
                        year: semester.year,
                        season: semester.season,
                        active : offer.faculty.active
                    });
                }
            }

            // Calculate availability percentages
            const totalSemesters = fallCount + springCount;
            let totalFallSemesters = 2;
            let totalSpringSemesters = 2;

            const fallAvailability = totalSemesters ? fallCount / totalFallSemesters : 0;
            const springAvailability = totalSemesters ? springCount / totalSpringSemesters : 0;


            // console.log(course.course_title, " : Total Semesters", totalSemesters)
            // console.log(course.course_title, " : Fall Semesters", fallAvailability.toFixed(2))
            // console.log(course.course_title, " : Spring Semesters", springAvailability.toFixed(2))

            // Structure the data as required
            courseData.push({
                id: course._id,
                course: `${course.course_dept} ${code} : ${title}`,
                course_details: course,
                fall_availability: parseFloat(fallAvailability.toFixed(2)),
                spring_availability: parseFloat(springAvailability.toFixed(2)),
                fall_professors: fallProfessors,
                spring_professors: springProfessors,
            });
        }

        return json({ courseData, allProfessors });

    } catch (error) {
        console.error('Error in /api/generate:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}