# Campify Project Documentation

[... Previous sections unchanged ...]

## SignUp and Login

### SignUpPage
- **File**: `SignUpPage.tsx`
- **Purpose**: Allows users to sign up as either a `guest` or `host`.
- **Details**: Unchanged from previous implementation.
  - Added a `role` field (`guest` or `host`) to the form using `Radio.Group`.
  - Included `role` in the `formData` state and API payload.
  - Calls `login` with the selected `role` and redirects to `/profile` (guest) or `/dashboard` (host).
- **API Integration**: Sends `role` to `http://localhost:8080/signup/signup`.

### LoginPage
- **File**: `LoginPage.tsx`
- **Purpose**: Allows `guest` or `host` users to log in with their role.
- **Details**: Unchanged from previous implementation.
  - Added a `role` field to the form using `Radio.Group`.
  - Sends `role` in the API request to `http://localhost:8080/api/auth/login`.
  - Calls `login` with the `username` and `role` from the API response.

### AdminLoginPage
- **File**: `AdminLoginPage.tsx`
- **Purpose**: Provides a separate login for admins, redirecting to `/admin/dashboard` on success.
- **Details**:
  - Uses `useAdminAuth` to access `adminLogin` from `AdminAuthContext`.
  - Sends `username` and `password` to `http://localhost:8080/api/auth/admin/login` via Axios.
  - On success, calls `adminLogin(username, callback)` with the `username` from the form and redirects to `/admin/dashboard`.
  - On failure, displays form errors ("Invalid username or password").
- **API Integration**:
  - Assumes the backend accepts `{ username, password }` and returns `{ username }`.
  - Update the Axios call if the backend uses a different endpoint or payload structure.

[... Rest of the documentation unchanged ...]