const https = require('https');
const fs = require('fs');

const urls = [
    { name: 'A', url: "https://maps.app.goo.gl/SrWx1Hc9WbNaUFeN9" },
    { name: 'B', url: "https://maps.app.goo.gl/Vfeb77dEUvji3mtq7" }
];

let results = [];
let completed = 0;

urls.forEach((item) => {
    https.request(item.url, { method: 'HEAD' }, (res) => {
        results.push(`${item.name}: ${res.headers.location}`);
        completed++;
        if (completed === urls.length) {
            fs.writeFileSync('maps_output.txt', results.join('\n'));
            console.log('Done writing to maps_output.txt');
        }
    }).on('error', (e) => {
        results.push(`${item.name}: Error ${e.message}`);
        completed++;
        if (completed === urls.length) {
            fs.writeFileSync('maps_output.txt', results.join('\n'));
        }
    }).end();
});
