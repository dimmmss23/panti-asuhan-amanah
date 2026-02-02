const https = require('https');

const urls = [
    "https://maps.app.goo.gl/SrWx1Hc9WbNaUFeN9", // Location A
    "https://maps.app.goo.gl/Vfeb77dEUvji3mtq7"  // Location B
];

urls.forEach((url, index) => {
    https.request(url, { method: 'HEAD' }, (res) => {
        console.log(`URL ${index === 0 ? 'A' : 'B'}: ${res.headers.location}`);
    }).on('error', (e) => {
        console.error(e);
    }).end();
});
