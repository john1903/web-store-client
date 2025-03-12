# Web Store Frontend

## Overview

This repository contains the frontend application built with Vue.js, serving as the client-side interface for the
*spring-boot-web-store-api* (version 1.1.0). The project follows best practices in Vue.js development, ensuring a
smooth and efficient user experience.

## Features

- Seamless integration with **spring-boot-web-store-api** (v1.1.0)
- Modern UI/UX built with Vue.js best practices
- Component-based architecture for modular development
- API-driven product listings and user interactions
- Fully responsive design for desktop and mobile

## Screenshots

### Home Page

![Home Page](/screenshots/home.png)

### Products Page

![Products Page](/screenshots/products.png)

### Product Details

![Product Details](/screenshots/product.png)

### About Page

![About Page](/screenshots/about.png)

### Cart Page

![Cart Page](/screenshots/cart.png)

### Orders Page

![Orders Page](/screenshots/orders.png)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [Vue CLI](https://cli.vuejs.org/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/john1903/web-store-client.git
   cd web-store-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:8080/` (or as specified in the Vue configuration).

### Connecting to Backend API

Ensure that **spring-boot-web-store-api** (v1.1.0) is running and accessible. Configure the API base URL in the `.env`
file:

```
VUE_APP_API_URL=http://localhost:3000/api
```

## Build for Production

To build the application for production:

```sh
npm run build
```

This will generate optimized assets in the `dist/` directory.

## License

This project is provided under a view-only license. You are welcome to review the code and documentation; however,
reproduction, modification, or any use beyond personal study is strictly prohibited without explicit permission from the
author.
