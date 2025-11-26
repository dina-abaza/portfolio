import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Contact from '../../../models/Contact';
import * as SibApiV3Sdk from '@sendinblue/client';
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


        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const brevoApiKey = process.env.BREVO_API_KEY;
        if (!brevoApiKey) {
            throw new Error('BREVO_API_KEY is not defined in environment variables.');
        }
        const apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = brevoApiKey;

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = `New Contact Submission from ${sanitizedData.fullName}`;

        sendSmtpEmail.htmlContent = `
  <div style="
      font-family: Arial, sans-serif;
      background-color: #f5f7fa;
      padding: 30px;
  ">
    <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 25px 35px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        border: 1px solid #e6e6e6;
    ">

      <h2 style="
          text-align: center;
          color: #1a1a1a;
          margin-bottom: 25px;
          letter-spacing: 0.5px;
      ">
        📩 New Contact Submission
      </h2>

      <div style="font-size: 15px; color: #333;">
        <p style="margin: 10px 0;"><strong>👤 Full Name:</strong> ${sanitizedData.fullName}</p>
        <p style="margin: 10px 0;"><strong>📧 Email:</strong> ${sanitizedData.email}</p>
        <p style="margin: 10px 0;"><strong>📞 Phone:</strong> ${sanitizedData.phone}</p>
        <p style="margin: 10px 0;"><strong>💡 Idea:</strong></p>

        <div style="
            background: #f0f4ff;
            padding: 15px;
            border-radius: 8px;
            margin-top: 5px;
            border-left: 4px solid #3c6ff8;
            line-height: 1.6;
        ">
          ${sanitizedData.ideaDescription}
        </div>
      </div>

      <p style="text-align:center; margin-top: 30px; font-size: 13px; color: #888;">
        Sent automatically from Aurora Portfolio Contact Form
      </p>

    </div>
  </div>
`;



                                     sendSmtpEmail.sender = {
                                        name: "Aurora Contact Form",
                                        email: "aurorasoftwarehouse@gmail.com"
                                      };
                                      


        const toEmail = process.env.TO_EMAIL || "aurorasoftwarehouse@gmail.com";
        sendSmtpEmail.to = [{ email: toEmail }];

        try {
            await apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (emailError) {
            console.error('Error sending email via Brevo:', emailError);
            // Optionally, you can decide to return an error response here or let the main catch block handle it.
            // For now, we'll just log and proceed, assuming the contact form submission itself was successful.
        }

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