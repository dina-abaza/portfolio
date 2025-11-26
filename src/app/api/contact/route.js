import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Contact from '../../../models/Contact';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
// POST
export async function POST(request) {
    await dbConnect();
    try {
        const formData = await request.json();
        // Basic sanitization function
        const sanitizeInput = (input) => {
            if (typeof input !== 'string') return input;
            return input.trim(); // Trim whitespace
            // For more robust sanitization against XSS, consider a library like 'dompurify'
            // For example: return DOMPurify.sanitize(input.trim());
        };

        // Sanitize form data
        const sanitizedData = {
            fullName: sanitizeInput(formData.fullName),
            email: sanitizeInput(formData.email),
            phone: sanitizeInput(formData.phone),
            ideaDescription: sanitizeInput(formData.ideaDescription),
        };

        const contact = await Contact.create(sanitizedData);
          

        // Configure Nodemailer transporter using App Password (requires Google 2-Step Verification)
        const transporter = nodemailer.createTransport({
            host: process.env.BREVO_SMTP_HOST,
            port: process.env.BREVO_SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.BREVO_SMTP_LOGIN,
                pass: process.env.BREVO_SMTP_KEY,
            },
        });

         
        // Email options
        const mailOptions = {
            from: process.env.BREVO_SMTP_LOGIN,
            to: process.env.TO_EMAIL || "aurorasoftwarehouse@gmail.com",   // Use TO_EMAIL from .env.local or default
            subject: `New Contact Submission from ${sanitizedData.fullName}`,
            text: `
                    Full Name: ${sanitizedData.fullName}
                    Email: ${sanitizedData.email}
                    Phone: ${sanitizedData.phone}
                    Idea: ${sanitizedData.ideaDescription}
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Message received & email sent successfully!', data: contact },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error processing form submission:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return NextResponse.json({ message: messages.join(', ') }, { status: 400 });
        }
        return NextResponse.json({ message: 'Error processing request.' }, { status: 500 });
    }
}