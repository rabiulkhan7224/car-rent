# Car Rent

## Project Overview
This Car Rental System is a full-stack web application designed to facilitate seamless car bookings, efficient inventory management, and user authentication. It combines a responsive frontend with a robust backend to deliver a user-centric experience.

## Live URL
 https://car-rent-a11-15.netlify.app


## Key Features
### General Features
- User-friendly interface with intuitive navigation.
- Fully responsive design for mobile, tablet, and desktop.
- Secure user authentication with Firebase and JWT.
- Real-time updates for car availability and booking statuses.

### Pages & Functionalities
1. **Home Page**:
   - **Banner Section**: A motivational heading with a call-to-action button.
   - **Why Choose Us**: Highlights platform's unique selling points.
   - **Recent Listings**: Displays the latest cars added for rental.
   - **User Testimonials & Special Offers**: Showcases user reviews and promotions.

2. **Add Car Page** (Private):
   - Allows authenticated users to add cars with details like model, price, features, etc.
   - Supports file uploads using `react-dropzone`.

3. **My Cars Page** (Private):
   - Displays a tabular list of cars added by the user.
   - Provides options to update or delete cars.
   - Includes sorting by date and price.

4. **Available Cars Page**:
   - Lists all available cars in grid or list view.
   - Search and sort functionality based on model, brand, or location.

5. **Car Details Page**:
   - Detailed car information with a "Book Now" button.

6. **My Bookings Page** (Private):
   - Displays a list of all bookings with options to modify or cancel bookings.

### Security Features
- Secure Firebase configuration keys and MongoDB credentials using environment variables.
- JWT-based authentication to protect private routes.
- HTTP-only cookies for secure token storage.

### Deployment Guidelines
- Properly deployed server and client without CORS/404/504 errors.
- Live link functional with smooth navigation.

## Technology Stack
### Frontend
- **React.js**: Component-based architecture for building the UI.
- **Tailwind CSS**: Utility-first framework for styling.
- **React Router**: For navigation and route protection.
- **React Dropzone**: For file uploads.

### Backend
- **Node.js & Express.js**: Backend framework for API development.
- **MongoDB**: Database for storing user and car data.
- **JWT**: Secure authentication and session management.

### Other Tools
- **Firebase Authentication**: For user authentication.
- **Axios**: For API requests.
- **Toastify**: For notifications.
- **Chart.js**: For data visualization (optional).

## Installation
1. Clone the repositories:
   ```bash
   git clone [client-repo-url]
   git clone [server-repo-url]
   ```

2. Navigate to each directory and install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - **Client**: `.env` file for Firebase configuration.
   - **Server**: `.env` file for MongoDB connection string and JWT secret.

4. Start the development servers:
   ```bash
   cd client
   npm start
   cd ../server
   npm run dev
   ```

## Deployment
1. Deploy the frontend using a platform like Vercel or Netlify.
2. Deploy the backend on platforms like Heroku or Render.
3. Ensure all environment variables are correctly configured.

## Commits
- **Client**: At least 15 meaningful commits with descriptive messages.
- **Server**: At least 8 meaningful commits with descriptive messages.

## Optional Features
- Server-side pagination on the "My Cars" page.
- Dynamic search functionality across all car data fields.
- Data visualization for booking trends or revenue using `chart.js`.

## License
This project is licensed under the [MIT License](LICENSE).

---
Thank you for reviewing the README! Ensure all deployment guidelines are followed for smooth functionality.
