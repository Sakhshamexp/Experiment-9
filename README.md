# RBAC React Frontend Project

## 1. How RBAC is Implemented
Role-Based Access Control (RBAC) ensures users only access resources permitted by their designated roles. 
In this project, our architecture protects routes locally in React based on the user's logged-in role (`USER` or `ADMIN`).
- **User Dashboard (`/user`)**: Accessible by users carrying the `USER` or `ADMIN` role.
- **Admin Dashboard (`/admin`)**: A restricted endpoint exclusively available to the `ADMIN` role.

The `<ProtectedRoute>` component intercepts transitions. If a user tries navigating to a path they shouldn't access (like a regular user trying to open `/admin`), it forcibly redirects them back to an authorized area.

## 2. Session Handling
Authentication data is persisted explicitly using the window's `sessionStorage`. 
- Upon successful login, the `username`, `role`, and `authHeader` (a Base64 encoded Basic Auth string) are saved to storage.
- Using `sessionStorage` ensures that the user is logged out instantly when they close the browser tab.
- When performing backend API calls, the frontend includes this stored `authHeader` in the HTTP Authorization headers using Axios to prove identity continuously across requests.
- Clicking **Logout** wipes the `sessionStorage` clean and navigates back to the Login display.

## 3. Role-Based UI Restrictions
Conditionals within the UI adapt visually depending on the user's role stored in the active session. This maintains a clean and secure UI experience.
- The `Navbar` hides "Admin Panel" linking directly if the participant logs in as a typical `USER`. An `ADMIN`, conversely, gets to see links leading to both the Admin and User dashboards.
- By isolating responsibilities into conditional renders (e.g., `{role === 'ADMIN' && <Button>Admin</Button>}`), we make sure standard users aren't even made aware of administration controls they possess zero clearance for.
