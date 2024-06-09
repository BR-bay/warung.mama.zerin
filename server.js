const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint untuk menerima pesanan dan mengirim email
app.post('/send-order-email', (req, res) => {
    const { name, email, order } = req.body;

    // Konfigurasi transporter email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bayurgt1@gmail.com', // Ganti dengan alamat email Anda
            pass: 'bayurgt2021' // Ganti dengan kata sandi email Anda
        }
    });

    // Konfigurasi email yang akan dikirim
    const mailOptions = {
        from: 'Warung Mama Zerin <bayurgt1@gmail.com>', // Ganti dengan alamat email Anda
        to: 'bayurgt1@gmail.com', // Ganti dengan alamat email tujuan (alamat Anda)
        subject: 'Pesanan Baru dari Warung Mama Zerin',
        html: `<p>Nama: ${name}</p><p>Email: ${email}</p><p>Pesanan: ${order}</p>`
    };

    // Kirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('OK');
        }
    });
});

// Serve halaman statis
app.use(express.static('public'));

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
