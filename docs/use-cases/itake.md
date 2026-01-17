---
sidebar_position: 2
---

# iTake - Food Delivery

iTake is a decentralized food delivery platform built on Horizon Protocol, demonstrating how real-world logistics can be coordinated through blockchain-backed escrow and guild-based organization.

## Overview

iTake connects three key participants:
- **Restaurants** - Food providers who receive orders
- **Customers** - Users who place orders
- **Drivers** - Delivery performers who fulfill orders

## How It Works

### Order Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Customer   │────▶│  Restaurant  │────▶│   Mission    │
│  Places Order │     │ Prepares Food│     │   Created    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Settlement  │◀────│   Delivery   │◀────│Driver Claims │
│   Complete   │     │   Verified   │     │   Mission    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Step-by-Step

1. **Customer orders** food via the iTake app
2. **Restaurant confirms** and prepares the order
3. **Delivery mission** is created with pickup/dropoff locations
4. **Available drivers** see the mission on their map
5. **Driver accepts** and navigates to restaurant
6. **Driver picks up** food and marks ready for delivery
7. **Driver delivers** to customer location
8. **Customer confirms** receipt
9. **Payment settles** automatically to all parties

## Guild Structure

iTake uses Horizon's MetaDAO/SubDAO hierarchy:

```
┌─────────────────────────────────────────────────────────┐
│                 iTake MetaDAO                            │
│              (Platform Governance)                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Restaurant  │  │ Restaurant  │  │ Restaurant  │     │
│  │   SubDAO    │  │   SubDAO    │  │   SubDAO    │     │
│  │  (Joe's)    │  │  (Tacos)    │  │  (Pizza)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### MetaDAO (iTake)

- Sets platform-wide policies
- Manages dispute resolution
- Collects platform fee
- Coordinates cross-restaurant features

### SubDAOs (Restaurants)

- Each restaurant is a SubDAO
- Manages their own menu and availability
- Sets delivery zones
- Earns fee share on their orders

## Payment Distribution

When a delivery is completed:

| Recipient | Description |
|-----------|-------------|
| **Driver** | Base delivery fee + tips |
| **Restaurant** | Keeps food revenue |
| **iTake** | Platform fee |
| **Protocol** | Horizon protocol fees |

## Key Features

### For Restaurants

- **Easy onboarding** - Register as a SubDAO
- **Menu management** - Update items and prices
- **Order dashboard** - Track incoming orders
- **Analytics** - View sales and performance

### For Drivers

- **Mission discovery** - See nearby deliveries on map
- **Earnings tracking** - View completed missions and earnings
- **Reputation building** - Earn XP and ratings
- **Flexible schedule** - Accept missions when available

### For Customers

- **Restaurant discovery** - Browse nearby restaurants
- **Real-time tracking** - Follow delivery progress
- **Secure payments** - Funds held in escrow
- **Rating system** - Rate restaurants and drivers

## Location Verification

iTake uses Horizon's geofencing features:

- **Pickup verification** - Driver confirmed at restaurant
- **Delivery verification** - Driver confirmed at customer location
- **Live tracking** - Real-time driver location (opt-in)
- **Privacy preserved** - Location data auto-purged

## Integration Example

```typescript
// Create delivery mission from order
const deliveryMission = await horizonClient.createMission({
  title: `Delivery from ${restaurant.name}`,
  description: order.items.map(i => i.name).join(', '),
  reward: order.deliveryFee,
  pickup: {
    latitude: restaurant.lat,
    longitude: restaurant.lng,
    address: restaurant.address,
  },
  dropoff: {
    latitude: customer.lat,
    longitude: customer.lng,
    address: customer.address,
  },
  guild: restaurant.subDAOAddress,
  expiresIn: 3600, // 1 hour
});
```

## Getting Started

### As a Restaurant

1. Contact iTake to register as a SubDAO
2. Set up your menu in the restaurant dashboard
3. Configure delivery zones and hours
4. Start receiving orders

### As a Driver

1. Download the iTake driver app
2. Connect your wallet
3. Join available delivery guilds
4. Start accepting missions

### As a Customer

1. Download the iTake app
2. Browse restaurants in your area
3. Place an order
4. Track your delivery in real-time

## Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    iTake Frontend                        │
│           (Customer App · Driver App · Dashboard)        │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                     iTake API                            │
│          (Orders · Restaurants · Matching)               │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                   Horizon Protocol                       │
│    (Missions · Escrow · Guilds · Reputation · Map)      │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                      Base L2                             │
│               (Smart Contracts · USDC)                   │
└─────────────────────────────────────────────────────────┘
```

## Resources

- [Protocol Overview](/docs/protocol/overview)
- [Guild System](/docs/protocol/guilds)
- [SDK Documentation](/docs/sdk/overview)
- [API Reference](/docs/api/overview)
