const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns').promises;

const diagnoseConnection = async () => {
  console.log('=== MongoDB Atlas Connection Diagnostic ===\n');
  
  // Step 1: Check environment variable
  console.log('1. Environment Variable Check:');
  console.log('   MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('   URI starts with mongodb+srv://:', process.env.MONGODB_URI?.startsWith('mongodb+srv://'));
  console.log('   URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
  console.log('');
  
  // Step 2: DNS Resolution Test
  console.log('2. DNS Resolution Test:');
  try {
    const hostname = 'cluster0.xlxmaxs.mongodb.net';
    console.log(`   Attempting to resolve: ${hostname}`);
    const records = await dns.resolve(hostname);
    console.log('   ✅ DNS resolved successfully:', records);
  } catch (err) {
    console.log('   ❌ DNS resolution failed:', err.message);
    console.log('   This might be a network/firewall issue');
  }
  console.log('');
  
  // Step 3: MongoDB Connection Test
  console.log('3. MongoDB Connection Test:');
  try {
    mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('   ✅ MongoDB connected successfully!');
    
    // Check database info
    const db = mongoose.connection.db;
    console.log('   Database name:', db.databaseName);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('   Collections found:', collections.length);
    if (collections.length > 0) {
      console.log('   Collection names:', collections.map(c => c.name).join(', '));
    }
    
    await mongoose.disconnect();
    console.log('   ✅ Disconnected successfully\n');
    console.log('=== DIAGNOSIS: Connection is working! ===');
  } catch (error) {
    console.log('   ❌ Connection failed:', error.message);
    console.log('   Error code:', error.code);
    console.log('   Error name:', error.name);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n⚠️  LIKELY CAUSES:');
      console.log('   - Your IP address is not whitelisted in MongoDB Atlas');
      console.log('   - Network firewall blocking outbound connections to MongoDB');
      console.log('   - Corporate/school network restrictions');
      console.log('\n📋 SOLUTIONS:');
      console.log('   1. Go to https://cloud.mongodb.com/');
      console.log('   2. Select your cluster');
      console.log('   3. Click "Network Access"');
      console.log('   4. Add your current IP address (or use 0.0.0.0/0 for testing)');
      console.log('   5. Wait 1-2 minutes and try again');
    } else if (error.message.includes('AuthenticationFailed')) {
      console.log('\n⚠️  Authentication failed - check your username/password in .env');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n⚠️  DNS issue - check your network connection');
    }
    
    console.log('\n=== DIAGNOSIS: Connection FAILED ===');
  }
};

diagnoseConnection();
