const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    // Connect with options
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Atlas connected successfully!');
    
    // List databases to verify connection
    const adminDb = mongoose.connection.db.admin();
    const listDatabases = await adminDb.listDatabases();
    console.log('Available databases:', listDatabases.databases.map(db => db.name).join(', '));
    
    console.log('✅ Connection test passed!');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check if your IP address is whitelisted in MongoDB Atlas Network Access');
    console.log('2. Verify your MongoDB Atlas cluster is running');
    console.log('3. Check your firewall/antivirus settings');
    console.log('4. Try connecting from a different network');
  }
};

testConnection();
