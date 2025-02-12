const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    try {
        const { business_email, linkedin_profile, website } = req.body;
        // Add your database logic here
        // Add your email service logic here
        
        res.json({ success: true, message: 'Thank you for signing up!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';  // Listen on all network interfaces

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Access locally via http://localhost:${PORT}`);
    console.log(`Access from other devices via http://192.168.178.116:${PORT}`);
}); 