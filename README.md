# 🩸 AI-Drive: Smart Blood Demand Forecasting & Donor Network

**AI-Drive** is an AI-powered web app that helps hospitals forecast blood demand and notifies nearby eligible donors in real-time. It uses predictive analytics, geolocation, and modern UI/UX to solve one of the most life-critical and underserved problems in public health: blood shortages and inefficient donor mobilization.



## 🧠 Problem Statement

Millions of patients around the world suffer due to **unforeseen blood shortages**. Hospitals lack tools to forecast demand, donors don’t know when they’re needed, and existing systems are fragmented and reactive.

---

## 🌟 Key Features

### 🔐 User Authentication & Onboarding
- Role-based login via Firebase Auth (Donor / Blood Bank / Admin)
- First-time user onboarding flow with profile setup

### 📊 AI-Powered Forecast Dashboard
- Real-time blood demand predictions based on mock ML data
- Interactive charts for blood stock levels, shortage risk, and donor trends

### 🗺️ Donor Match Map
- Google Maps API shows nearby hospitals needing blood
- Geofenced donor notifications and real-time wait times
- Mobile-friendly map with AR-style animations

### 📈 Live Data Dashboard
- Tailored for hospitals: blood inventory, donor engagement, shortage alerts
- Tailored for donors: donation history, eligibility, impact tracker

### 🧩 API Integrations
- `Google Maps API` for hospital geolocation and routing
- `Disease.sh API` or `OpenWeatherMap API` for outbreak/climate correlation with blood demand

---

## 🛠️ Tech Stack

| Layer        | Tech Used                                  |
|--------------|---------------------------------------------|
| Frontend     | React, Next.js, TypeScript, Tailwind CSS    |
| Backend      | Firebase (Auth, Firestore, Hosting), Supabase (optional) |
| APIs         | Google Maps, Disease.sh / OpenWeatherMap   |
| Charts       | Recharts, Victory, Chart.js (customizable) |
| Animations   | Framer Motion                               |
| Forms        | React Hook Form + Zod                       |
| Analytics    | Firebase Analytics or PostHog               |

---

## 🔐 Accessibility & UX

- Fully responsive mobile-first design
- WCAG-compliant: ARIA labels, color contrast, keyboard nav
- Smooth user onboarding flow with visual feedback and guidance

---

## ⚡ Hackathon-Ready Demo Flow

1. **Sign in** as a Donor or Hospital Admin
2. **Complete your profile** (e.g., blood type, location)
3. **View forecast dashboard** with predicted shortages
4. **Open the map** to find nearby hospitals needing blood
5. **Respond to alert** → confirm donation
6. **View impact tracker**: "You saved 3 lives this week!"

---

## 💾 Sample Data

- 5 hospitals with variable blood levels
- 20 mock donors with diverse blood types and locations
- 7-day regional demand forecast (mock AI output)

---

## 📂 Project Structure

