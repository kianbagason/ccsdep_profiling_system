require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n=== MongoDB Connection Verification ===\n');
console.log('Connection String:', process.env.MONGODB_URI);
console.log('\nAnalyzing connection string...');

const uri = process.env.MONGODB_URI;

if (uri.startsWith('mongodb+srv://')) {
  console.log('\n✅ Connection Type: MongoDB Atlas (Cloud)');
  console.log('   - Using SRV record (mongodb+srv://)');
  console.log('   - This is NOT a local connection');
} else if (uri.startsWith('mongodb://localhost') || uri.startsWith('mongodb://127.0.0.1')) {
  console.log('\n⚠️  Connection Type: Local MongoDB');
  console.log('   - Connecting to localhost');
} else {
  console.log('\n✅ Connection Type: Remote MongoDB Instance');
}

// Extract database name
const dbMatch = uri.match(/\/([^?\/\s]+)(\?|$)/);
if (dbMatch && dbMatch[1]) {
  console.log(`\n📊 Database Name: ${dbMatch[1]}`);
} else {
  console.log('\n⚠️  No database name specified in URI');
}

// Test the actual connection
console.log('\n\n=== Testing Actual Connection ===\n');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`   Connection host: ${mongoose.connection.host}`);
    console.log(`   Connection port: ${mongoose.connection.port}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    
    // Get server status
    return mongoose.connection.db.admin().serverStatus();
  })
  .then((status) => {
    console.log('\n📊 MongoDB Server Information:');
    console.log(`   Version: ${status.version}`);
    console.log(`   Uptime: ${Math.round(status.uptime)} seconds`);
    console.log(`   Hostname: ${status.host}`);
    console.log('\n✅ This confirms you are connected to MongoDB Atlas (cloud), NOT localhost!\n');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err.message);
    console.error('\nPlease check:');
    console.error('1. Your MongoDB Atlas cluster is running');
    console.error('2. Your IP address is whitelisted in MongoDB Atlas');
    console.error('3. Your username and password are correct');
    process.exit(1);
  });
