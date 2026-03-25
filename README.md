# HealthSaaS - B2B Healthcare Dashboard

A modern, responsive, production-ready B2B Healthcare SaaS application built with React, TypeScript, and Vite.

## 🚀 Live Demo
**[https://cheerful-melba-0ef507.netlify.app](https://cheerful-melba-0ef507.netlify.app)**

## ✨ Features
- **Secure Authentication**: Production-grade Firebase auth with session persistence.
- **Patient Management**: Grid/List views, dynamic routing, simulated real-time search.
- **Analytics Visualization**: CSS-driven metric charts for key performance indicators.
- **Push Notifications**: Integrated Service Worker for native browser push notifications on login.
- **Fully Responsive**: Mobile-first design with a collapsible hamburger sidebar and optimized dashboard grids.
- **Micro-Frontend Ready**: Architected using Vite Module Federation for scalable enterprise development.

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS Modules (Glassmorphism design system)
- **Backend/Auth**: Firebase Integration
- **Icons**: Lucide React

## 📦 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/aditya6386/B2B-Healthcare-SaaS.git
   cd b2b-healthcare-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Architecture
The codebase follows a strict feature-based architecture for maintainability:
```text
src/
├── features/      # Independent feature modules (auth, patients, analytics)
├── layouts/       # Global persistent layouts (MainLayout, Sidebar)
├── lib/           # Third-party integrations (Firebase)
├── store/         # Global Zustand state stores
└── components/    # Shared atomic UI elements (Buttons, Inputs, Cards)
```
