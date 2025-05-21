import { json } from '@sveltejs/kit';
import Message from '../../../db/models/message.model';
import connectDB from '../../../db/db';

export async function POST({ request }) {
    await connectDB();

    try {
        const data = await request.json();
        const { name, email, subject, message } = data;

        // Create and save the message to database
        const newMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        console.log('Message saved:', newMessage);
        return json({
            success: true,
            message: 'Message received and stored successfully'
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return json({
            success: false,
            message: 'Failed to process your message'
        }, { status: 500 });
    }
} 