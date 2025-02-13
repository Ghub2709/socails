require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '..')));

// Rate limiting configuration
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all routes
app.use(limiter);

// Secure headers
const helmet = require('helmet');
app.use(helmet());

// EmailJS configuration endpoint with additional security
const emailjsConfig = {
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID
};

// Secure endpoint to get EmailJS configuration
app.get(['/api/config', '/config'], (req, res) => {
    // Check if all required environment variables are set
    if (!emailjsConfig.EMAILJS_PUBLIC_KEY || !emailjsConfig.EMAILJS_SERVICE_ID || !emailjsConfig.EMAILJS_TEMPLATE_ID) {
        return res.status(500).json({ error: 'EmailJS configuration is incomplete' });
    }

    // Set security headers
    res.set({
        'Content-Security-Policy': "default-src 'self'",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
    });

    // Return configuration in the format expected by both pages
    res.json({
        // For index.html format
        ...emailjsConfig,
        // For thank-you.html format
        emailjs: {
            publicKey: emailjsConfig.EMAILJS_PUBLIC_KEY,
            serviceId: emailjsConfig.EMAILJS_SERVICE_ID,
            templateId: emailjsConfig.EMAILJS_TEMPLATE_ID
        }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 