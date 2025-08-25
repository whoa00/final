# Campify Project Documentation

This document outlines the role-based authentication and conditional rendering implemented in the Campify React project, including updates to move the dark mode toggle to the Contact page and remove the `ThemeContext`. The project uses React, TypeScript, Ant Design, and Yarn, with role-based access control for three user roles: `guest`, `host`, and `admin`.

## Project Overview

Campify is a web application for booking campsites, with different functionalities available based on user roles:
- **Guest**: Can view the home page, community projects, profile, settings, and contact pages. Redirected to `/profile` after login.
- **Host**: Can access all guest pages plus a dashboard and analytics. Redirected to `/dashboard` after login.
- **Admin**: Has a separate login and access to an admin dashboard, user management, system settings, and analytics. Redirected to `/admin/dashboard` after login.

The navbar is conditionally rendered based on the user's role, and certain routes are protected to enforce role-based access.

## Role-Based Authentication

### AuthContext
- **File**: `AuthContext.tsx`
- **Purpose**: Manages authentication state for `guest` and `host` users.
- **Key Features**:
  - Stores `isLoggedIn` and `user` (with `username` and `role: 'guest' | 'host' | 'admin'`) in state.
  - `login(username, role, callback)`: Sets the user and redirects to `/profile` (guest) or `/dashboard` (host).
  - `logout(callback?)`: Clears the user state and optionally redirects.
  - `useEffect`: Automatically redirects to the appropriate landing page based on the user role after login.
- **Usage**: Wraps the app in `AuthProvider` and used via `useAuth` hook.

### AdminAuthContext
- **File**: `AdminAuthContext.tsx`
- **Purpose**: Manages separate authentication for `admin` users.
- **Key Features**:
  - Stores `isAdminAuthenticated` and `adminUser` (with `username` and `role: 'admin'`).
  - `adminLogin(username, callback)`: Authenticates an admin and redirects to `/admin/dashboard`.
  - `adminLogout(callback?)`: Clears admin state and optionally redirects.
- **Usage**: Wraps the app in `AdminAuthProvider` and used via `useAdminAuth` hook.

### ProtectedRoute
- **File**: `ProtectedRoute.tsx`
- **Purpose**: Restricts access to routes based on login status and role.
- **Key Features**:
  - Accepts an optional `allowedRoles` prop to specify which roles (`guest`, `host`, `admin`) can access the route.
  - Redirects to `/login` if not logged in, or to the user's landing page (`/profile` for guest, `/dashboard` for host) if the role is not allowed.
- **Usage**:
  - Applied to `/dashboard` and `/analytics` (restricted to `host`).
  - Used for general authentication checks on `/profile`.

### AdminProtectedRoute
- **File**: `App.tsx` (defined inline)
- **Purpose**: Protects admin routes (`/admin/*`) to ensure only authenticated admins can access them.
- **Key Features**:
  - Checks `isAdminAuthenticated` from `AdminAuthContext`.
  - Redirects to `/admin/login` if not authenticated.
- **Usage**: Applied to `/admin/dashboard`, `/admin/users`, `/admin/settings`, and `/admin/analytics`.

## Conditional Navbar Rendering

### Navbar
- **File**: `Navbar.tsx`
- **Purpose**: Displays a role-specific navigation menu.
- **Menu Items by Role**:
  - **Guest**:
    - Home (`/`)
    - Community (`/projects`)
    - Profile (`/profile`)
    - Settings (`/settings`)
    - Contact (`/contact`)
  - **Host**:
    - All guest items plus:
    - Dashboard (`/dashboard`)
    - Analytics (`/analytics`)
  - **Admin**:
    - Admin Dashboard (`/admin/dashboard`)
    - User Management (`/admin/users`)
    - System Settings (`/admin/settings`)
    - Analytics (`/admin/analytics`)
- **Logic**:
  - Uses `useAuth` and `useAdminAuth` to determine the user's role.
  - Selects the appropriate menu items array based on whether the user is an admin or their role (`guest` or `host`).
  - Guests cannot see or navigate to `/dashboard` or `/analytics` via the navbar.

## Landing Pages

- **Guest**: Redirected to `/profile` after login or signup.
- **Host**: Redirected to `/dashboard` after login or signup.
- **Admin**: Redirected to `/admin/dashboard` after admin login.
- **Implementation**:
  - Handled in `AuthContext` via `useEffect` for `guest` and `host` users.
  - Handled in `AdminAuthContext` via the `adminLogin` callback for admins.
  - `ProtectedRoute` enforces role-based access to prevent unauthorized navigation (e.g., guests accessing `/dashboard`).

## SignUp and Login

### SignUpPage
- **File**: `SignUpPage.tsx`
- **Purpose**: Allows users to sign up as either a `guest` or `host`.
- **Changes**:
  - Added a `role` field (`guest` or `host`) to the form using `Radio.Group`.
  - Included `role` in the `formData` state and API payload.
  - Updated `login` call to pass the selected `role` and redirect to the appropriate landing page (`/profile` for guest, `/dashboard` for host).
- **API Integration**:
  - Sends `role` to the backend via `axios.post('/signup/signup')`.
  - Assumes the backend accepts `role` in the payload and returns it in the login response.

### LoginPage
- **File**: `LoginPage.tsx`
- **Purpose**: Allows `guest` or `host` users to log in with their role.
- **Changes**:
  - Added a `role` field to the login form using `Radio.Group`.
  - Sends `role` in the API request (`axios.post('/api/auth/login')`).
  - Calls `login` with the `username` and `role` from the API response, redirecting to the appropriate landing page.
- **API Integration**:
  - Assumes the backend returns `{ username, role }` in the login response.

### AdminLoginPage
- **File**: `AdminLoginPage.tsx`
- **Purpose**: Separate login for admins, redirecting to `/admin/dashboard`.
- **Details**: Unchanged from the original implementation, uses `AdminAuthContext` for authentication.

## Dark Mode Implementation

- **File**: `Contact.tsx`
- **Purpose**: Manages the dark mode toggle, previously handled by `ThemeContext`.
- **Changes**:
  - Added local `isDarkMode` state and `useEffect` to set the `data-theme` attribute on `document.documentElement`.
  - Added a `Switch` component for toggling between light and dark modes.
- **Styling**:
  - Dark mode styles are defined in `index.css` using CSS variables and `[data-theme='dark']` selectors.
  - Variables include `--background-color`, `--text-color`, `--antd-background`, etc.

- **Removed**: `ThemeContext.tsx`, `ThemeProvider`, and `useTheme` from `App.tsx`, `Settings.tsx`, and `index.tsx`.

## Routing

- **File**: `App.tsx`
- **Purpose**: Defines the application's routes and protects them based on roles.
- **Routes**:
  - Public: `/login`, `/signup`, `/admin/login`
  - Unprotected (accessible to all): `/`, `/projects`, `/settings`, `/contact`
  - Protected (requires login):
    - `/profile`: Accessible to `guest` and `host`
    - `/dashboard`: Restricted to `host`
    - `/analytics`: Restricted to `host`
  - Admin Protected (requires admin authentication):
    - `/admin/dashboard`, `/admin/users`, `/admin/settings`, `/admin/analytics`
- **Changes**:
  - Removed `ThemeProvider` and `useTheme`.
  - Added `AdminProtectedRoute` to protect admin routes.
  - Kept `ProtectedRoute` for `/dashboard` and `/analytics` with `allowedRoles={['host']}`.
  - Added placeholder admin routes (`/admin/users`, `/admin/settings`, `/admin/analytics`) pointing to `AdminDashboard`.

## Styling

- **File**: `index.css`
- **Purpose**: Defines dark mode CSS variables and theme-specific styles.
- **Details**:
  - Retained as the primary location for dark mode styles.
  - Variables: `--background-color`, `--text-color`, `--antd-background`, `--text-secondary`, `--border-color`, `--table-header-bg`, `--table-hover-bg`, `--box-shadow-xs`, etc.
  - Applied to `body` and `[data-theme]` selectors.
- **File**: `App.css`
- **Changes**:
  - Removed redundant theme variables (now in `index.css`).
  - Kept layout and component-specific styles using the variables from `index.css`.

## Cleanup Recommendations

1. **Footer.tsx**:
   - Not provided but referenced in `Layout.tsx`. Either implement a minimal `Footer` component or remove it from `Layout.tsx`.
   - Example `Footer.tsx`:
     ```tsx
     import React from 'react';
     import { Layout } from 'antd';

     const { Footer: AntFooter } = Layout;

     const Footer: React.FC = () => {
       return (
         <AntFooter className="site-footer" style={{ textAlign: 'center' }}>
           Campify © {new Date().getFullYear()} Created by Your Team
         </AntFooter>
       );
     };

     export default Footer;
     ```

2. **Placeholder Pages**:
   - `Analytics.tsx`, `Projects.tsx`, and `Contact.tsx` (beyond the toggle) are minimal. Consider implementing full functionality or removing them if not needed.
   - Admin routes (`/admin/users`, `/admin/settings`, `/admin/analytics`) are placeholders. Implement corresponding components or remove the routes and navbar items.

3. **CSS Modules**:
   - `login.module.css`, `signup.module.css`, and `home.module.css` are well-structured but could be consolidated for shared form styles.
   - Remove unused styles (e.g., `.customButton` in `signup.module.css`) if not used.

4. **Unused Imports**:
   - `MergeOutlined` in `Layout.tsx` may be temporary. Replace with a logo image or remove the placeholder.
   - Admin-specific icons (`TeamOutlined`, `ControlOutlined`) in `Navbar.tsx` are only used for placeholder routes. Remove if the routes aren't implemented.

5. **Backend API**:
   - Ensure the backend at `http://localhost:8080` supports the `role` field in `/signup/signup` and `/api/auth/login` endpoints.
   - Type the API responses in `SignUpPage.tsx` and `LoginPage.tsx` for better TypeScript safety.

## Testing

1. **Guest User**:
   - Sign up as a `guest` and verify redirection to `/profile`.
   - Check that the navbar shows Home, Community, Profile, Settings, and Contact.
   - Attempt to access `/dashboard` or `/analytics` (should redirect to `/profile`).

2. **Host User**:
   - Sign up as a `host` and verify redirection to `/dashboard`.
   - Check that the navbar shows Home, Community, Dashboard, Profile, Settings, Analytics, and Contact.
   - Access `/dashboard` and `/analytics` (should be allowed).

3. **Admin User**:
   - Log in via `/admin/login` and verify redirection to `/admin/dashboard`.
   - Check that the navbar shows Admin Dashboard, User Management, System Settings, and Analytics.
   - Attempt to access `/admin/*` routes without logging in (should redirect to `/admin/login`).

4. **Dark Mode**:
   - Visit `/contact` and toggle dark mode using the `Switch`.
   - Verify that the UI updates (e.g., background, text colors) based on `index.css` variables.

## Implementation Notes

- **Backend Integration**: Update the backend API to handle the `role` field. The `SignUpPage` and `LoginPage` assume the API returns `{ username, role }` for login and accepts `role` in signup.
- **Admin Routes**: The `/admin/users`, `/admin/settings`, and `/admin/analytics` routes are placeholders. Implement dedicated components or remove them if not needed.
- **CSS Consolidation**: Consider moving shared form styles to a single CSS module to reduce duplication.
- **TypeScript**: Add interfaces for API responses in `SignUpPage.tsx` and `LoginPage.tsx` to improve type safety.

This documentation reflects the project state as of August 4, 2025.