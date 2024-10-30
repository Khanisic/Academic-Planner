import Concentration from '../../../../../../db/models/concentrations.model'
import connectDB from '../../../../../../db/db'
import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { conc_id } = params;
    await connectDB();

    // eslint-disable-next-line no-useless-catch
    try {
        let concentration = await Concentration.findById(conc_id)
            .populate({
                path: 'concentration_required_courses',
                model: 'Course'
            })
            .populate({
                path: 'concentration_elective_courses',
                model: 'Course'
            })

        if (!concentration) {
            throw new Error('Program not found');
        }

        // Convert ObjectIds to strings
        concentration = JSON.parse(JSON.stringify(concentration));

        return { concentration };
    } catch (error) {
        throw error;
    }
}

