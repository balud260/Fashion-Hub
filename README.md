# SwiftShop E-commerce

A modern, simple, and intuitive e-commerce platform built with React. This project focuses on beginner-friendly code patterns while providing a full-featured shopping experience.

## ✨ Features

- **Dynamic Product Browsing**: Fetches products from the Platzi Fake Store API.
- **Category Filtering**: Filter products by their respective categories.
- **Real-time Search**: Find products instantly using the search bar in the navbar.
- **Shopping Cart**:
  - Add products with custom quantities.
  - Update quantities within the cart.
  - Remove items.
  - Persistent cart state using `localStorage`.
- **Mock Checkout**: A realistic checkout flow focusing on UI and simulation.
- **Order Tracking**: View a list of "placed" orders in the My Orders section.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices.
- **Smooth Animations**: Powered by `framer-motion`.

## 🛠️ Tech Stack

- **Framework**: React (Functional Components & Hooks)
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: [Platzi Fake Store API](https://fakeapi.platzi.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1.  **Extract the ZIP file**: Unzip the project folder.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

```text
/src
  /components
    /Cart         - Shopping cart page
    /Checkout     - Mock checkout form
    /Footer       - Site footer
    /Home         - Product listing and hero banner
    /Login        - Simple login UI (Demo)
    /Navbar        - Global navigation with search
    /Orders       - Order history page
    /ProductCard  - Reusable product card component
    /ProductDetail- Single product view
  App.jsx         - Root component with state management
  main.jsx        - Entry point
  index.css       - Global styles
```

## 🌐 API Details

This app utilizes the **Platzi Fake Store API** for all data:
- **Base URL**: `https://api.escuelajs.co/api/v1`
- **Endpoints Used**:
  - `/products`: Fetch all products.
  - `/products/:id`: Fetch specific product details.
  - `/categories`: Fetch site categories.
