# My React App

A simple React application with form handling and user registration flow.

## Project Structure

```
my-react-app/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/              # Images, fonts, CSS, etc.
│   ├── components/          # Reusable React components
│   ├── pages/               # Page-level components
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point of the app
│   └── App.css              # App-wide styling
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.ts
```

## Features

- Landing page with welcome message
- Personal information form with validation
- Password setup and confirmation
- Responsive design with Facebook-style theme
- Local data storage
- Form validation and error handling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Form Flow

1. **Landing Page**: Welcome screen with "Get Started" button
2. **Personal Info**: Collect user's basic information (name, email, phone, date of birth)
3. **Password Setup**: Create and confirm password
4. **Completion**: Success message with submission details

## Technologies Used

- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Local Storage (data persistence)

## Form Validation

- All fields are required
- Email format validation
- Password minimum length (8 characters)
- Password confirmation matching
- Real-time error feedback

## Data Handling

The application uses direct form handlers without a backend. Form data is:
- Validated on the client side
- Stored locally in the browser's localStorage
- Includes device information for tracking purposes

## Customization

- Modify styles in `src/App.css`
- Add new components in `src/components/`
- Create new pages in `src/pages/`
- Update form fields in the respective page components