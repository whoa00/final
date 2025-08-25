# Camping Reservation System with vzero Integration

This project is a camping reservation system built with React and TypeScript, featuring vzero payment integration.

## Features

- Camping site reservation system
- User authentication and authorization
- Admin dashboard
- Host management
- vzero payment processing
- Responsive design

## vzero Integration

This project includes vzero payment system integration for secure payment processing.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## vzero Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
REACT_APP_VZERO_BASE_URL=https://api.vzero.com
REACT_APP_VZERO_API_KEY=your_vzero_api_key_here
REACT_APP_VZERO_SECRET_KEY=your_vzero_secret_key_here
```

### 2. API Configuration

The vzero integration is configured in `src/lib/vzero.ts`. You can modify the API endpoints and authentication methods as needed.

### 3. Testing

To test the vzero integration, navigate to the test page at `/vzero-test` or use the `VzeroPayment` component in your pages.

### 4. Usage Example

```tsx
import VzeroPayment from './components/VzeroPayment';

<VzeroPayment
  amount={50000}
  onSuccess={(result) => console.log('Payment successful:', result)}
  onError={(error) => console.error('Payment failed:', error)}
/>
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
