// Handle purchase form submission
document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const order = document.getElementById('order').value;

    // Kirim pesanan ke server
    fetch('/send-order-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, order })
    })
    .then(response => {
        if (response.ok) {
            alert('Pesanan Anda telah terkirim!');
            document.getElementById('purchase-form').reset();
        } else {
            alert('Terjadi kesalahan. Coba lagi.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Coba lagi.');
    });
});
