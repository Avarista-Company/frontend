
# Avarista 🛍️✨

**Explore local clothing stores and try outfits virtually. Shop smarter, together.**

---

## 📋 Overview

**Avarista** is a modern, location-aware e-commerce frontend that helps users discover and explore **nearby local clothing stores**. Users can visualize clothes with **AR/VR try-ons**, get **AI-based outfit feedback**, and collaborate with family or friends using a **shared community cart**.

Built for solo shoppers, style enthusiasts, and **event-based group purchases** like weddings or festivals.

---

### ✨ Key Features

* **Local Store Discovery** – View nearby clothing stores with visual previews.
* **AR/VR Try-On** – Try clothes virtually using immersive viewers.
* **AI Outfit Feedback** – Receive style suggestions and outfit ratings.
* **Community Cart** – Shop with others in real time—perfect for group events.
* **Retailer Dashboard** – For store owners to manage listings and inventory.
* **Wedding/Event Coordination** – Support for family/group purchases during weddings or special occasions.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or later)
* npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/avarista-frontend.git
cd avarista-frontend
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🗺️ Pages & Routing

| Route                 | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `/`                   | Home page with hero banner, featured outfits, and nearby stores |
| `/stores`             | Explore local stores with filters                               |
| `/stores/:id`         | Store detail page showing product collection                    |
| `/try-on`             | Try-on viewer with AR/VR support (placeholder)                  |
| `/ai-feedback`        | Submit outfit and receive feedback (mock AI)                    |
| `/community-cart`     | Shared cart for group/family purchases                          |
| `/login`              | Login form                                                      |
| `/register`           | Registration form                                               |
| `/retailer-dashboard` | Dashboard for store owners                                      |

---

## 🗂️ Project Structure

```
avarista/
├── public/
│   └── images/
├── src/
│   ├── assets/              # Static files like images, icons
│   ├── components/          
│   │   ├── common/          # Reusable buttons, inputs, cards
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # Cart items, store cards, etc.
│   ├── contexts/            # Global state (auth, cart, toast)
│   ├── data/                # Mock data: products, stores
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Individual screen/page components
│   ├── App.jsx              # Routes and providers
│   └── main.jsx             # App entry point
```

---

## 🛠️ Technologies Used

* **React.js** – Component-based UI
* **Vite** – Fast dev server and build tool
* **React Router DOM** – Client-side routing
* **Tailwind CSS** – Utility-first styling
* **Heroicons** – SVG icons
* **React Context API** – App-wide state sharing

---

## 🧪 Simulated Features

* **AR/VR Try-On** – Uses iframe or placeholder to simulate outfit visualization.
* **AI Feedback** – Simulates feedback like “Looks great with beige accessories.”
* **Community Cart** – Simulated real-time updates using shared context state.

---

## 🧩 Component System

### Usage Examples

```jsx
// Button
<Button variant="primary">View More</Button>

// Input
<Input label="Search Store" value={search} onChange={handleSearch} />

// Card
<Card title="Elegant Kurta" image="/images/kurta.jpg" />
```

### Using Contexts

```jsx
const { currentUser } = useAuth();
const { cart, addToCart } = useCart();
const { addToast } = useToast();
```

---

## 🎨 Styling Guidelines

* Use Tailwind classes (`text-lg`, `bg-primary`, etc.)
* Reusable components with `props.className` support
* Custom color palette in `tailwind.config.js`


## 📱 Responsive UX

* Mobile-first layout with grid flex wrapping
* Sticky header and hamburger nav for mobile
* Product cards with hover/scale animations
* Input fields and buttons are responsive

---

## 🎯 Designed For

* Everyday fashion shoppers
* Event-based buyers (weddings, festivals, functions)
* Retailers managing local digital storefronts
* Families and groups shopping together

---

## 🏗️ Production Build

```bash
npm run build
```

