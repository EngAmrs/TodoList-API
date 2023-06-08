# TodoList-API

### Todos
- List all Todos in the database
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Get single Todo
- Create new Todo
  * Authenticated users only
  * Field validation via Mongoose
  * Field validation via JOI
- Update Todos
  * Owner only
  * Validation on update
- Delete Todos
  * Owner only
  
### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 7 days
- User registration
  * Register as a "user" or "Admin"
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

## Security
- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add headers for security (helmet)
- Allow cors for specific API
