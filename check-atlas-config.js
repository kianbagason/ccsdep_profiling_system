require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n========================================');
console.log('MongoDB Atlas Configuration Checker');
console.log('========================================\n');

// 1. Check connection string
console.log('1. CONNECTION STRING ANALYSIS:');
console.log('   String:', process.env.MONGODB_URI);
console.log('   Type:', process.env.MONGODB_URI?.includes('mongodb+srv://') ? '✅ MongoDB Atlas' : '❌ Local/Other');
console.log('   Has database name:', process.env.MONGODB_URI?.includes('/ccs_profiling_system') ? '✅ Yes' : '❌ No');
console.log('   Username:', process.env.MONGODB_URI?.split(':')[1]?.split('@')[0] || 'Unknown');
console.log('   Cluster:', process.env.MONGODB_URI?.split('@')[1]?.split('.')[0] || 'Unknown');

// 2. Try to connect
console.log('\n2. ATTEMPTING CONNECTION:\n');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('   ✅ CONNECTION SUCCESSFUL!\n');
    console.log('3. CONNECTION DETAILS:');
    console.log('   Database:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host || 'Atlas SRV (no direct host)');
    console.log('   Port:', mongoose.connection.port || 'N/A');
    console.log('   Ready State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    
    // List databases (requires admin privilege)
    return mongoose.connection.db.admin().listDatabases();
  })
  .then((databases) => {
    console.log('\n4. AVAILABLE DATABASES IN CLUSTER:');
    databases.databases.forEach(db => {
      const isTarget = db.name === mongoose.connection.name;
      console.log(`   ${isTarget ? '🎯' : '  '} ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    console.log('\n5. STATUS:');
    console.log('   ✅ You are successfully connected to MongoDB Atlas!');
    console.log('   ✅ This is NOT a local connection!');
    console.log('   📊 Your app will use database:', mongoose.connection.name);
    console.log('\n========================================\n');
    
    process.exit(0);
  })
  .catch((err) => {
    console.log('   ❌ CONNECTION FAILED\n');
    console.log('3. ERROR DETAILS:');
    console.log('   Message:', err.message);
    console.log('   Code:', err.code);
    console.log('   Hostname:', err.hostname || 'N/A');
    
    console.log('\n4. TROUBLESHOOTING STEPS:');
    
    if (err.message.includes('ECONNREFUSED')) {
      console.log('   ⚠️  ECONNREFUSED - Connection refused by server');
      console.log('   \n   ACTION REQUIRED:');
      console.log('   1. Go to MongoDB Atlas → Network Access');
      console.log('   2. Click "Add IP Address"');
      console.log('   3. Add "0.0.0.0/0" (Allow from anywhere)');
      console.log('   4. Wait 5-10 minutes for changes to propagate');
      console.log('   5. Try running this script again');
    } else if (err.message.includes('AuthenticationFailed')) {
      console.log('   ⚠️  Authentication Failed');
      console.log('   \n   ACTION REQUIRED:');
      console.log('   1. Go to MongoDB Atlas → Database Access');
      console.log('   2. Verify user "ccsprofilingsystem" exists');
      console.log('   3. Reset password if needed');
      console.log('   4. Update .env file with correct credentials');
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('hostname')) {
      console.log('   ⚠️  DNS/Hostname Issue');
      console.log('   \n   ACTION REQUIRED:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify cluster URL is correct');
      console.log('   3. Check firewall settings');
    }
    
    console.log('\n========================================\n');
    process.exit(1);
  });
