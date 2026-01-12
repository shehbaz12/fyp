# Single Admin Account - Security Implementation

## ✅ Security Measures Implemented

### 1. **Signup Validation**
The backend now prevents creating multiple admin accounts:

```javascript
// In auth.controller.js
if (role === 'admin') {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
        return res.status(403).json({
            message: 'Admin account already exists. Only one admin is allowed.'
        });
    }
}
```

### 2. **Admin Initialization Script**
Created `create-admin.js` to safely create the first admin account.

## 🚀 How to Create the Admin Account

### Step 1: Run the Admin Creation Script
```bash
cd d:/Fyp/Frontend/backend
npm run create-admin
```

### Step 2: Default Admin Credentials
```
📧 Email:    admin@gov.pk
🔑 Password: Admin@123456
```

### Step 3: First Login
1. Login with the default credentials
2. **IMMEDIATELY change the password**
3. Update email if needed

## 🔒 Security Best Practices

### ✅ What's Protected:
- ✅ Only ONE admin account can exist
- ✅ Cannot create admin via public signup
- ✅ Admin credentials are hashed in database
- ✅ Script checks for existing admin before creating

### ⚠️ Important Security Notes:

1. **Change Default Password Immediately**
   - Default password is `Admin@123456`
   - Change it on first login
   - Use strong password (min 12 characters, mix of upper/lower/numbers/symbols)

2. **Protect Admin Credentials**
   - Never share admin login
   - Use secure password manager
   - Enable 2FA (future enhancement)

3. **Admin Account Recovery**
   - If admin password is lost, contact database administrator
   - Admin can only be reset via MongoDB Atlas directly
   - Keep backup of admin email

## 🛡️ How It Works

### Scenario 1: Creating First Admin
```bash
npm run create-admin
```
**Result:** ✅ Admin created successfully

### Scenario 2: Trying to Create Second Admin
```bash
npm run create-admin
```
**Result:** ❌ "Admin account already exists!"

### Scenario 3: Signup with Admin Role
```http
POST /api/auth/signup
{
  "email": "another@admin.com",
  "role": "admin"
}
```
**Result:** ❌ 403 Forbidden - "Admin account already exists"

## 📋 Admin Management

### View Current Admin (MongoDB Atlas)
1. Login to MongoDB Atlas
2. Browse Collections → `dms` → `users`
3. Filter: `{ "role": "admin" }`

### Reset Admin Password (Emergency)
1. Login to MongoDB Atlas
2. Find admin user
3. Delete the user document
4. Run `npm run create-admin` again
5. Change password immediately

### Update Admin Details
Create an endpoint (future):
```http
PATCH /api/auth/update-profile
Authorization: Bearer <admin-token>
{
  "name": "New Name",
  "phone": "+92 xxx"
}
```

## 🎯 Testing the Security

### Test 1: Create Admin
```bash
npm run create-admin
```
Expected: Success message with credentials

### Test 2: Try Creating Again
```bash
npm run create-admin
```
Expected: "Admin account already exists"

### Test 3: Signup as Admin
```javascript
fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Fake Admin',
    email: 'fake@admin.com',
    password: 'password',
    role: 'admin'
  })
})
```
Expected: 403 Error - "Admin account already exists"

## 🔐 Production Recommendations

1. **Environment Variables**
   - Store admin email in `.env`
   - Never commit credentials to git

2. **Audit Logging**
   - Log all admin actions
   - Monitor admin login attempts
   - Alert on suspicious activity

3. **Access Control**
   - Limit admin API endpoints
   - Require additional verification for critical actions
   - Implement session timeout

4. **Backup Strategy**
   - Regular database backups
   - Secure admin credential storage
   - Disaster recovery plan

## ✨ Summary

- ✅ Only ONE admin account allowed
- ✅ Protected at database and API level
- ✅ Easy initialization script
- ✅ Clear error messages
- ✅ Follows security best practices
