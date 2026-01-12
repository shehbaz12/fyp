require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Create initial admin account
const createAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            console.log('⚠️  Admin account already exists!');
            console.log(`📧 Email: ${adminExists.email}`);
            console.log(`👤 Name: ${adminExists.name}`);
            console.log('\n💡 If you need to reset the admin password, delete this user from MongoDB Atlas and run this script again.');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'System Administrator',
            email: 'admin@gov.pk',
            password: 'Admin@123456',  // CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN
            role: 'admin',
            phone: '+92 51 9205037',
            region: 'Islamabad',
            status: 'active'
        });

        console.log('\n🎉 Admin account created successfully!');
        console.log('═══════════════════════════════════════');
        console.log('📧 Email:    admin@gov.pk');
        console.log('🔑 Password: Admin@123456');
        console.log('═══════════════════════════════════════');
        console.log('\n⚠️  IMPORTANT SECURITY NOTICE:');
        console.log('1. Change this password immediately after first login');
        console.log('2. This is the ONLY admin account allowed in the system');
        console.log('3. Keep these credentials secure');
        console.log('4. Do not share admin access with unauthorized personnel\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

// Run the script
createAdmin();
