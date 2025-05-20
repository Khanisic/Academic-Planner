import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const { name, email, subject, message } = data;

        // Here you would typically:
        // 1. Validate the input
        // 2. Send an email using a service like SendGrid, AWS SES, etc.
        // 3. Store the message in a database
        
        // For now, we'll just log the data and return a success response
        console.log('Contact form submission:', { name, email, subject, message });

        return json({
            success: true,
            message: 'Message received successfully'
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return json({
            success: false,
            message: 'Failed to process your message'
        }, { status: 500 });
    }
} 