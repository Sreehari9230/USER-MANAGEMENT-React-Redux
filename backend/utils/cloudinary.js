import { v2 as cloudinary } from 'cloudinary';

const cloudinary = require('cloudinary').v2

 // Configuration
 cloudinary.config({ 
    cloud_name: 'dlcm5poe3', 
    api_key: '599124394655399', 
    api_secret: '4NS5mGSzt1Zv-pvqshpxW5Shgx0' // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary