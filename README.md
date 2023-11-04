# MERN-Real-Estate
Real estate web application

Welcome to the Real Estate Web App! This web application is designed to help users search for, list, and manage real estate properties. Whether you're a real estate professional or a property seeker, this app provides you with the tools to make the process of buying, selling, or renting properties easier and more efficient.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Features](#features)
3. [Usage](#usage)


## Getting Started

### Prerequisites

Before you start using the Real Estate Web App, make sure you have the following installed:

- Node.js
- NPM (Node Package Manager)
- MongoDB (or a cloud-based MongoDB service)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Dani-ctrl-n/MERN-Real-Estate.git
   ```

2. Change to the project directory:

   ```bash
   cd mern-real-estate
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Change to the client directory:

   ```bash
   cd client
   ```

5. Install the required dependencies:

   ```bash
   npm install
   ```

6. Create a `.env` file in the root directory of the project and configure your environment variables. You'll need to set up the database connection details, authentication secrets, and any other required settings.

   Example `.env`:

   ```plaintext
   MONGO=mongodb://localhost:27017/real-estate-db
   JWT_SECRET=your_secret_key
   ```
   
7. Create a `.env` file in the client directory of the project and configure your firebase API key.
   Example `.env`:

   ```
   VITE_FIREBASE_API_KEY = your_api_key
   ```

8. cd to the root directory and start the application backend:

   ```bash
   npm run dev
   ```

9. cd to the client directory and start the application frontend:

   ```bash
   npm run dev
   ```

10. Open your web browser and navigate to [http://localhost:5173](http://localhost:5173) to access the Real Estate Web App.


## Features

The Real Estate Web App offers the following features:

1. **Property Listings**: Users can browse and search for real estate properties by location, price range, property type, and more.

2. **User Accounts**: Users can create accounts, log in, and manage their property listings or saved searches.

3. **Property Management**: Property owners or agents can list and manage their properties, including adding property details, images, and pricing.

4. **Search and Filters**: Users can filter search results by various criteria, such as property type, location, price, and more.

6. **Contact Agents**: Interested parties can contact property owners or agents directly through the app.
   

## Usage

1. Visit the web app's homepage to browse and search for properties.

2. Create a user account to access additional features like listing your properties.

3. Property owners and agents can log in, navigate to their profile, and start listing properties.

4. Use the search and filter options to refine your property search.

5. Contact property owners or agents for more information on a particular property.
