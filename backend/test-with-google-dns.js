require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Override DNS to use Google's public DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('\n========================================');
console.log('Testing with Google DNS (8.8.8.8)');
console.log('========================================\n');

console.log('DNS Servers:', dns.getServers());
console.log('\nAttempting to resolve MongoDB Atlas hostname...');

// Test DNS resolution first
const dnsPromises = require('dns').promises;

dnsPromises.resolve('_mongodb._tcp.cluster0.xlxmaxs.mongodb.net', 'SRV')
  .then((records) => {
    console.log('✅ DNS SRV record resolved successfully!');
    console.log('   Records found:', records.length);
    console.log('\nNow testing MongoDB connection...\n');
    
    return mongoose.connect(process.env.MONGODB_URI);
  })
  .then(() => {
    console.log('   ✅ CONNECTION SUCCESSFUL!\n');
    console.log('3. CONNECTION DETAILS:');
    console.log('   Database:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host || 'Atlas SRV (no direct host)');
    console.log('\n✅ MongoDB Atlas is connected!');
    console.log('✅ This is NOT a local connection!\n');
    console.log('========================================\n');
    process.exit(0);
  })
  .catch((err) => {
    if (err.code === 'ENOTFOUND' || err.message.includes('ENOTFOUND')) {
      console.log('   ❌ DNS Resolution Failed\n');
      console.log('3. ERROR DETAILS:');
      console.log('   Message:', err.message);
      console.log('\n4. SOLUTION:');
      console.log('   Your DNS cannot resolve MongoDB Atlas hostnames.');
      console.log('   \n   Please change your system DNS to:');
      console.log('   - Preferred: 8.8.8.8');
      console.log('   - Alternate: 8.8.4.4');
      console.log('\n   Steps:');
      console.log('   1. Windows + R → ncpa.cpl');
      console.log('   2. Right-click network adapter → Properties');
      console.log('   3. TCP/IPv4 → Properties');
      console.log('   4. Use DNS: 8.8.8.8 and 8.8.4.4');
    } else {
      console.log('   ❌ Connection Failed:', err.message);
    }
    console.log('\n========================================\n');
    process.exit(1);
  });
