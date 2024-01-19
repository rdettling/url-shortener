# URL Shortener

This project is a simple URL shortener service built with React for the frontend and Node.js with Express for the backend.

## Features

-   Shorten URLs with a single click
-   Copy shortened URLs to the clipboard
-   Redirect to original URLs using the shortened link

## Prerequisites

Before running this project, make sure you have the following installed:

-   Node.js and npm (Node package manager). You can download them from [nodejs.org](https://nodejs.org/).

## Installation

Follow these steps to run the URL shortener service locally:

### Backend

1. Navigate to the `backend` directory from the root of the project:
    ```sh
    cd backend
    ```
2. Install the necessary Node.js dependencies:
    ```sh
    npm install
    ```
3. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Open a new terminal and navigate to the frontend directory from the root of the project:
    ```sh
    cd frontend
    ```
2. Install the necessary Node.js dependencies:
    ```sh
    npm install
    ```
3. Start the React development server:
    ```sh
    npm start
    ```

The React app should now be running on http://localhost:3000 and should automatically open in your default web browser.

## Usage

To shorten a URL, simply enter the URL into the input field on the frontend application and click the "Shorten" button. The shortened URL will be displayed, and you will have the option to copy it to the clipboard.

To use the shortened URL, enter it into your browser's address bar, and you will be redirected to the original URL.
