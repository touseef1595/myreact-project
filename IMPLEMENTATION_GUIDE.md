# Firebase Authentication & Role-Based Access Control - Implementation Guide

## 🎯 Overview

This project implements a comprehensive authentication system with Firebase Authentication, Firestore user data storage, role-based access control, and secure CRUD operations.

## ✅ Implemented Features

### Task 1: Firebase Authentication Integration ✓

#### Email & Password Authentication
- **Sign Up**: Create new accounts with email and password
- **Sign In**: Login with existing credentials
- **Email Verification**: Automatic email verification sent on signup

#### Google Sign-In
- One-click authentication using Google OAuth
- Automatic user profile creation in Firestore

#### Account Management
- **Sign Out**: Logout functionality with session cleanup
- **Reset Password**: Email-based password reset flow
- **Delete Account**: Complete account deletion with reauthentication

### Task 2: Firestore User Data Storage ✓

- **Automatic User Profile Creation**: On signup or Google sign-in
- **Duplicate Prevention**: Checks existing users before creating new records
- **User Collection Structure**:
  ```javascript
  {
    uid: "user-firebase-uid",
    email: "user@example.com",
    displayName: "User Name",
    photoURL: "https://...",
    role: "user" or "admin",
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
  ```

### Task 3: Role-Based Protected Routing ✓

#### Route Protection
- **ProtectedRoute**: Accessible only to authenticated users
- **AdminRoute**: Accessible only to users with `role = "admin"`
- **Automatic Redirects**: Unauthorized access redirects appropriately

#### Dashboards
- **User Dashboard** (`/user-dashboard`):
  - View and manage own products
  - Add new products
  - Edit/delete own products only
  - Account deletion option

- **Admin Dashboard** (`/admin-dashboard`):
  - Full product management
  - View all products
  - Edit/delete any product
  - Complete system overview

### Task 4: Secure CRUD Access Control ✓

#### Product Management
- **Authentication Required**: Only logged-in users can perform CRUD operations
- **Admin Privileges**: Can manage all products in the system
- **User Restrictions**: Can only manage products they created
- **Owner Tracking**: All products tagged with `createdBy` field

#### Access Control Rules
```javascript
// Create - Any authenticated user
createProduct(productData, userId)

// Update - Admin or owner only
updateProduct(productId, data, userId, userRole)

// Delete - Admin or owner only
deleteProduct(productId, userId, userRole)
```

## 📁 Project Structure

```
src/
├── services/
│   ├── authService.js          # Firebase authentication methods
│   ├── userService.js          # Firestore user data management
│   └── productService.js       # Product CRUD with access control
├── context/
│   └── AuthContext.jsx         # Authentication state management
├── components/
│   ├── commons/
│   │   ├── ProtectedRoute.jsx  # User authentication guard
│   │   └── AdminRoute.jsx      # Admin role guard
│   ├── pages/
│   │   ├── AdminDashboard.jsx  # Admin product management
│   │   └── UserDashboard.jsx   # User product management
│   ├── Login.jsx               # Login with password reset
│   └── Signup.jsx              # Registration with Google option
└── App.jsx                     # Route configuration
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Configuration
Your Firebase configuration is already set up in `src/firebase/config.js`

### 3. Run Development Server
```bash
npm run dev
```

## 🧪 Testing Guide

### Test Authentication

#### 1. Sign Up (Email & Password)
- Navigate to `/signup`
- Enter name, email, and password
- Account created with `role = "user"` by default
- Redirected to home page

#### 2. Sign In (Email & Password)
- Navigate to `/login`
- Enter credentials
- Successfully logged in

#### 3. Google Sign-In
- Click "Continue with Google" on login or signup page
- Select Google account
- Automatic account creation if new user

#### 4. Password Reset
- On login page, click "Forgot Password?"
- Enter email address
- Check email for reset link

#### 5. Delete Account
- Login as user
- Go to User Dashboard
- Click "Delete Account"
- Enter password to confirm
- Account and data deleted

### Test Role-Based Access

#### 1. User Access
- Login as regular user
- Access `/user-dashboard` ✓ (allowed)
- Try `/admin-dashboard` ✗ (redirected to user dashboard)
- Can only see own products

#### 2. Admin Access
To test admin features, you need to manually update a user's role in Firestore:

1. Go to Firebase Console → Firestore Database
2. Find the `users` collection
3. Select a user document
4. Change `role` field from "user" to "admin"
5. Login as that user
6. Access `/admin-dashboard` ✓ (allowed)
7. Can view and manage all products

### Test CRUD Operations

#### As Regular User:
1. Login
2. Go to User Dashboard
3. **Create**: Add new product → Success
4. **Read**: View own products → Success
5. **Update**: Edit own product → Success
6. **Delete**: Delete own product → Success
7. Try to edit another user's product → Error (permission denied)

#### As Admin:
1. Login as admin
2. Go to Admin Dashboard
3. **Create**: Add new product → Success
4. **Read**: View all products → Success
5. **Update**: Edit any product → Success
6. **Delete**: Delete any product → Success

## 🔐 Security Features

1. **Authentication Required**: All CRUD operations require login
2. **Ownership Verification**: Users can only modify their own data
3. **Admin Override**: Admin role bypasses ownership checks
4. **Firestore Rules**: (Recommended to add server-side rules)
5. **Password Reauthentication**: Required for account deletion

## 📊 Firestore Collections

### users
- Stores user profiles and roles
- Fields: uid, email, displayName, photoURL, role, createdAt, updatedAt

### products
- Stores product data
- Fields: name, price, description, category, imageUrl, stock, createdBy, createdAt, updatedAt

## 🎨 UI Features

### Navbar
- Dynamic based on authentication state
- Shows Dashboard link for logged-in users
- Admin/User badge display
- Logout button

### Dashboards
- **Admin Dashboard**: Purple theme, full management
- **User Dashboard**: Blue theme, personal management
- Real-time product updates
- Inline product form
- Statistics cards

## 🛣️ Routes

```javascript
Public Routes:
- / (Home)
- /about
- /contact
- /products
- /login
- /signup

Protected Routes (Authenticated Users):
- /user-dashboard

Admin Routes (Admin Role Only):
- /admin-dashboard
- /admin
```

## 📝 Usage Examples

### Check User Role
```javascript
import { useAuth } from './context/AuthContext'

function MyComponent() {
  const { userProfile, isAdmin } = useAuth()
  
  if (isAdmin()) {
    // Admin-only functionality
  }
}
```

### Create Product with Authentication
```javascript
import { createProduct } from './services/productService'
import { useAuth } from './context/AuthContext'

function CreateProductExample() {
  const { currentUser } = useAuth()
  
  const handleCreate = async () => {
    const productData = {
      name: "Product Name",
      price: 99.99,
      // ... other fields
    }
    
    await createProduct(productData, currentUser.uid)
  }
}
```

## 🐛 Troubleshooting

### Issue: "No user is currently signed in"
- Solution: Ensure user is logged in before performing CRUD operations

### Issue: "You do not have permission to update this product"
- Solution: Verify user is either admin or product owner

### Issue: Admin dashboard not accessible
- Solution: Check user's role in Firestore is set to "admin"

### Issue: Google Sign-In not working
- Solution: Ensure Google Auth provider is enabled in Firebase Console

## 🔄 Data Flow

1. **User Signs Up/In** → Firebase Authentication
2. **User Data Stored** → Firestore `users` collection
3. **AuthContext Updated** → React state with user + profile
4. **Protected Routes Check** → Authentication status + role
5. **CRUD Operations** → Verify permissions before execution
6. **UI Updates** → Based on user role and ownership

## ✨ Key Components

### AuthContext
Provides global authentication state and methods:
- `currentUser`: Firebase user object
- `userProfile`: Firestore user data with role
- `login()`, `signup()`, `loginWithGoogle()`, `logout()`
- `forgotPassword()`, `deleteUserAccount()`
- `isAdmin()`, `isAuthenticated()`

### ProductService
Handles all product CRUD with access control:
- Checks authentication
- Verifies ownership
- Enforces role-based permissions

## 🎉 Success Criteria

All tasks completed successfully:
- ✅ Firebase Authentication (Email, Google, Password Reset, Delete Account)
- ✅ Firestore User Data Storage (No duplicates)
- ✅ Role-Based Protected Routing (Admin & User dashboards)
- ✅ Secure CRUD Access Control (Admin full access, Users own data)

## 📞 Support

For issues or questions, check:
1. Firebase Console for authentication logs
2. Browser console for error messages
3. Firestore Database for data verification
