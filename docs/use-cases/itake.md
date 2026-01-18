---
sidebar_position: 2
---

# iTake - Food Delivery

iTake is a **MetaDAO** (vertical application) running on Horizon Protocol, demonstrating how real-world logistics can be coordinated through blockchain-backed escrow and guild-based organization. Users access iTake through the **iTake mini-app** within the Horizon mobile application.

## Overview

iTake connects three key participants through the Horizon mobile app:
- **Restaurants** - Food providers who operate as SubDAOs
- **Customers** - Users who order food via the Consumer Mini-App
- **Drivers** - Delivery performers who fulfill orders via the Worker Mini-App

## DAO Structure

iTake implements Horizon's hierarchical DAO model:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        iTake MetaDAO                                 │
│                      (Platform Layer)                                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ • Platform governance and policies                            │  │
│  │ • Cross-restaurant dispute resolution                         │  │
│  │ • Driver pool coordination                                    │  │
│  │ • Platform-wide promotions                                    │  │
│  │ • Collects 1% MetaDAO fee                                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                    Restaurant SubDAOs                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │   Café A    │  │  Pizzeria B │  │  Tacos C    │  │    ...    │  │
│  │   SubDAO    │  │   SubDAO    │  │   SubDAO    │  │           │  │
│  │             │  │             │  │             │  │           │  │
│  │ Menu        │  │ Menu        │  │ Menu        │  │           │  │
│  │ Staff       │  │ Staff       │  │ Staff       │  │           │  │
│  │ Analytics   │  │ Analytics   │  │ Analytics   │  │           │  │
│  │ 2% SubDAO   │  │ 2% SubDAO   │  │ 2% SubDAO   │  │           │  │
│  │ fee         │  │ fee         │  │ fee         │  │           │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### MetaDAO Responsibilities

The iTake MetaDAO handles platform-level functions:

| Function | Description |
|----------|-------------|
| **Governance** | Sets platform policies, fee structures, quality standards |
| **Dispute Resolution** | Manages cross-restaurant and driver-customer disputes |
| **Driver Pool** | Coordinates the shared driver network across all restaurants |
| **Onboarding** | Approves new restaurant SubDAOs |
| **Compliance** | Ensures food safety and delivery standards |

### SubDAO Responsibilities

Each restaurant operates as an independent SubDAO:

| Function | Description |
|----------|-------------|
| **Menu Management** | Create, update, price menu items |
| **Order Handling** | Accept, prepare, mark orders ready |
| **Staff Management** | Manage kitchen staff roles and permissions |
| **Analytics** | Track orders, revenue, ratings, popular items |
| **Delivery Zones** | Configure delivery radius and fees |

---

## Consumer Mini-App

The Consumer Mini-App is accessed within the Horizon mobile application and provides the customer ordering experience.

### Features

| Feature | Description |
|---------|-------------|
| **Restaurant Discovery** | Browse nearby restaurants by cuisine, rating, or distance |
| **Menu Browsing** | View menus, item photos, descriptions, prices, and dietary info |
| **Cart & Checkout** | Add items, customize orders, specify delivery address |
| **Real-Time Tracking** | Follow order preparation and driver location live |
| **Order History** | View past orders, reorder favorites, track spending |
| **Ratings & Reviews** | Rate food quality, delivery speed, and driver service |

### User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Consumer Journey                             │
└─────────────────────────────────────────────────────────────────┘

1. Browse        2. Customize      3. Checkout       4. Track
   ↓                 ↓                 ↓                ↓
┌───────┐       ┌───────┐        ┌───────┐        ┌─────────┐
│Select │──────▶│Build  │───────▶│ Pay   │───────▶│Watch    │
│Restaur│       │ Cart  │        │(Escrow│        │ Live    │
│ ant   │       │       │        │ Lock) │        │ Map     │
└───────┘       └───────┘        └───────┘        └─────────┘
                                                        │
                                     ┌──────────────────┘
                                     ▼
                              5. Receive & Rate
                                     ↓
                              ┌───────────┐
                              │Confirm    │
                              │Delivery   │
                              │& Rate     │
                              └───────────┘
```

### Key Screens

- **Home**: Featured restaurants, categories, search
- **Restaurant**: Menu categories, item grid, restaurant info
- **Item Detail**: Photos, description, customization options
- **Cart**: Order summary, delivery info, estimated time
- **Checkout**: Payment confirmation, escrow lock
- **Tracking**: Preparation status, driver location, ETA
- **Order Complete**: Rating prompts, reorder option

---

## Worker Mini-App (Driver Mode)

Drivers access the Worker Mini-App by switching to "Driver Mode" within the iTake section of the Horizon app.

### Features

| Feature | Description |
|---------|-------------|
| **Mission Discovery** | See available deliveries on an interactive map |
| **Earnings Dashboard** | Track daily/weekly earnings, completed deliveries |
| **Route Navigation** | Turn-by-turn directions to pickup and dropoff |
| **Order Details** | View items, special instructions, customer notes |
| **Status Updates** | Mark arrived, picked up, delivered |
| **XP & Reputation** | View level progress, ratings, achievements |

### Driver Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Driver Journey                              │
└─────────────────────────────────────────────────────────────────┘

1. Go Online     2. Accept         3. Pickup         4. Deliver
      ↓               ↓                 ↓                 ↓
┌─────────┐     ┌─────────┐      ┌─────────┐      ┌─────────────┐
│ See     │────▶│ Claim   │─────▶│Navigate │─────▶│Navigate to  │
│Available│     │ Mission │      │to Rest. │      │ Customer    │
│Missions │     │         │      │Mark     │      │ Complete    │
└─────────┘     └─────────┘      │Picked Up│      │ Delivery    │
                                 └─────────┘      └─────────────┘
                                                        │
                                     ┌──────────────────┘
                                     ▼
                              5. Get Paid
                                     ↓
                              ┌───────────────┐
                              │ Escrow        │
                              │ Settles       │
                              │ Automatically │
                              └───────────────┘
```

### Mission States

| State | Description |
|-------|-------------|
| **Available** | Visible on map, not yet claimed |
| **Accepted** | Driver claimed, navigating to restaurant |
| **At Pickup** | Driver at restaurant, waiting for food |
| **Picked Up** | Food in hand, navigating to customer |
| **Delivered** | Customer confirmed receipt |
| **Completed** | Payment settled, XP awarded |

### Driver Earnings

Drivers receive the delivery fee minus platform fees:

| Component | Amount |
|-----------|--------|
| **Base Delivery Fee** | Set by restaurant |
| **Distance Bonus** | Additional for longer deliveries |
| **Tips** | 100% go to driver |
| **Platform Fees** | ≤10% (driver keeps ≥90%) |

---

## Restaurant Dashboard

Restaurant operators access a web-based dashboard to manage their SubDAO.

### Dashboard Sections

#### Orders
- **Incoming Orders**: Accept or reject new orders
- **In Preparation**: Mark items as cooking/ready
- **Ready for Pickup**: Notify drivers, track handoffs
- **Order History**: Search, filter, export past orders

#### Menu Management
- **Categories**: Organize menu into sections
- **Items**: Add/edit items with photos, pricing, availability
- **Modifiers**: Create add-ons, customizations, sizes
- **Availability**: Toggle items on/off, set stock limits

#### Analytics
- **Revenue**: Daily, weekly, monthly revenue tracking
- **Popular Items**: Most ordered items, trending dishes
- **Ratings**: Average rating, recent reviews, feedback
- **Delivery Times**: Average prep time, delivery times

#### Staff (Guild Roles)
- **Owner**: Full control, treasury access
- **Manager**: Order management, menu editing
- **Kitchen**: View orders, mark items ready
- **Viewer**: Read-only access to analytics

#### Settings
- **Restaurant Info**: Name, description, photos, hours
- **Delivery Zones**: Geographic coverage, minimum orders
- **Fees**: Delivery fee structure, SubDAO fee percentage
- **Integrations**: POS, printer, notification settings

---

## Payment & Fee Distribution

When a delivery completes, the smart contract automatically distributes funds:

### Fee Breakdown

| Recipient | Percentage | Description |
|-----------|------------|-------------|
| **Driver** | ≥90% | Guaranteed minimum of delivery fee |
| **Protocol** | 2.5% | Platform sustainability |
| **Labs** | 2.5% | R&D and development |
| **Resolver** | 2% | Dispute resolution pool |
| **iTake (MetaDAO)** | 1% | Platform operations |
| **Restaurant (SubDAO)** | 2% | Restaurant's share |

### Example: €10 Delivery Fee

```
Driver:       €9.00 (90%)
Protocol:     €0.25 (2.5%)
Labs:         €0.25 (2.5%)
Resolver:     €0.20 (2%)
iTake:        €0.10 (1%)
Restaurant:   €0.20 (2%)
─────────────────────────
Total Fees:   €1.00 (10%)
```

> **Note**: Food revenue goes directly to the restaurant. The breakdown above applies only to delivery fees.

---

## Location & Verification

iTake uses Horizon's geolocation features for secure delivery verification.

### Geofence Verification

| Checkpoint | Radius | Purpose |
|------------|--------|---------|
| **Restaurant Pickup** | 75m | Confirm driver arrived at restaurant |
| **Customer Dropoff** | 75m | Confirm delivery completed |
| **Live Tracking** | Continuous | Real-time driver location (opt-in) |

### Privacy Features

- **Location Encryption**: All location data encrypted at rest
- **Auto-Purge**: Location history deleted after 30 days
- **Opt-In Tracking**: Drivers choose to share real-time location
- **Minimal Data**: Only essential location data stored

---

## Getting Started

### For Restaurants

1. **Apply**: Contact iTake MetaDAO to apply as a SubDAO
2. **Verification**: Provide business documentation, food safety certs
3. **Onboarding**: Set up restaurant profile, upload menu
4. **Configure**: Set delivery zones, hours, fees
5. **Go Live**: Start receiving orders

### For Drivers

1. **Requirements**: Valid ID, clean driving record, smartphone
2. **Join**: Apply through iTake MetaDAO or individual restaurants
3. **Verification**: Complete background check (where required)
4. **Training**: Complete onboarding tutorial in app
5. **Start Earning**: Go online and accept deliveries

### For Customers

1. **Download**: Get the Horizon mobile app
2. **Navigate**: Open the iTake mini-app
3. **Browse**: Explore restaurants in your area
4. **Order**: Build your cart and checkout
5. **Track**: Watch your order in real-time
6. **Rate**: Leave feedback for restaurant and driver

---

## Technical Integration

### Creating a Delivery Mission

```typescript
const order = await itakeClient.createOrder({
  restaurantId: restaurant.subDAOAddress,
  items: [
    { itemId: "pizza-margherita", quantity: 2 },
    { itemId: "tiramisu", quantity: 1 }
  ],
  deliveryAddress: {
    latitude: customer.lat,
    longitude: customer.lng,
    address: customer.formattedAddress,
  },
  paymentMethod: "usdc",
});

// Order creates a delivery mission automatically
// Mission is visible to drivers in the area
```

### Restaurant Webhook Events

```typescript
// Events restaurant systems can subscribe to
type RestaurantEvent =
  | "order.created"      // New order placed
  | "order.cancelled"    // Customer cancelled
  | "driver.assigned"    // Driver accepted mission
  | "driver.arrived"     // Driver at restaurant
  | "order.pickedup"     // Driver has food
  | "order.delivered"    // Delivery complete
  | "payment.settled";   // Funds distributed
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Horizon Mobile App                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              iTake Mini-App (Vertical)                    │  │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐│  │
│  │  │  Consumer Mode  │  │       Driver Mode               ││  │
│  │  │  (Ordering)     │  │       (Deliveries)              ││  │
│  │  └─────────────────┘  └─────────────────────────────────┘│  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    Restaurant Dashboard                          │
│            (Web App for SubDAO Management)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                   Horizon Service API                            │
│           iTake Module · Orders · Matching Engine                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                   Horizon Protocol                               │
│       Missions · Escrow · Guilds · Reputation · Map              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                        Base L2                                   │
│            Smart Contracts · DeliveryEscrow · USDC               │
└─────────────────────────────────────────────────────────────────┘
```

---

## XP & Progression

### Driver XP Rewards

| Action | XP | Notes |
|--------|-----|-------|
| Complete delivery | 12 XP | Base reward |
| 5-star rating | +5 XP | Bonus for excellence |
| Long distance (>5km) | +5 XP | Distance bonus |
| Streak bonus | +4-20 XP | Consecutive day multiplier |

### Driver Levels

| Level | XP Required | Benefits |
|-------|-------------|----------|
| Newcomer | 0 | Basic access |
| Driver | 300 | Verified badge |
| Pro | 1,500 | Priority queue |
| Expert | 5,000 | Premium missions |
| Master | 15,000 | Higher earnings |

---

## Resources

- [Protocol Overview](/docs/protocol/overview)
- [Guild System](/docs/protocol/guilds)
- [Economics](/docs/protocol/economics)
- [SDK Documentation](/docs/sdk/overview)
- [API Reference](/docs/api/overview)

---

> **Note**: iTake is one of several verticals (mini-apps) that can run on the Horizon Protocol. Each vertical operates as a MetaDAO with its own SubDAOs. Other examples include [ridesDAO](/docs/use-cases/ridesdao) for ride-sharing and [BuildDao](/docs/use-cases/builddao) for construction.
