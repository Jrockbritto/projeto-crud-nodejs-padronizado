# projeto-crud-nodejs
A crud project developed in 4 days, see more in the README.


## Requirements 🗒️:
- Docker;
- Node.js;
- Insomnia;
- Git;

## First step 👣:

### Clonning the project:
	- Run "git clone https://github.com/Jrockbritto/projeto-crud-nodejs.git";
	- Now run "npm install";
- Create a .env file and copy everything from the .env-example and paste it in the .env file;
	- Execute "npm run keyGen" (this will generate the app_key, responsible for the data encryption);
	- for the database connection part it should be something like this:
	
### Database connection:
	- APP_ENVIRONMENT="development"
	- DB_USERNAME="postgres"
	- DB_PASSWORD="password"
	- DB_DATABASE="postgres"
	- DB_HOST="127.0.0.1"
Preparing the database:
	- Run "npm run db-create" followed by a "npm run db-up". Now the database should be up and about!;
	

	
## Testing ⌨️
	- Import the Insomnia configuraton;
	- Run "npm run dev" (this will start the server);
	- Locate the Token folder and send the register request;
	- Insomnia will automatically fill the username and the password for the login;
	- Now send the login request and it will return the JWT Token (this is a login for the admin role);
### CRUD
	- Now locate the Admin_CRUD folder and send the post request, it will generate a new non admin user;
	- You can delete, update, get user, and fetch all the users while served with an authenticaded user Token;

### Explaining the test:


- Once you've sent the Admin_CRUD.post, all of the others request will be tied to the new user UUID.
- Make sure you login using the password "non_admin"
- You can try to send the same requests (but with a non admin token) in the No_Admin folder.
- For that you have to send the login request, now all of the other request should be tied to the Non admin token, and their response should be "Forbidden"
#### Changing to the admin role
- To change the Non admin user to the admin role, you must send the Admin_crud.put, this will update the password to admin and the role for admin, now the No_admin request should work accordingly.