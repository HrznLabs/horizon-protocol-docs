---
sidebar_position: 5
---

# Geofencing & Presence

Horizon Protocol uses geofencing to verify that missions requiring physical presence are completed correctly. This is critical for verticals like **iTake** (Delivery) and **RidesDAO**.

## The 75 Meter Rule

For any mission with a `locationHash`, the protocol enforces a **75-meter verification radius**. 

- **Pickup**: Performer must be within 75m of the pickup point to mark an order as "Picked Up".
- **Dropoff**: Performer must be within 75m of the destination to mark a mission as "Completed".
- **Grace Period**: The system allows for a 2-minute GPS drift window to account for signal loss in dense urban areas.

## Verification Flow

The verification process happens through the Horizon Mobile App (Worker Mode):

1. **GPS Sampling**: The app takes regular high-accuracy GPS samples.
2. **Hash Generation**: The coordinates are salted and hashed locally (Proof of Presence).
3. **API Validation**: The hash is sent to the Horizon Service, which compares it against the encrypted mission location.
4. **State Unlock**: If the distance is ≤ 75m, the restricted contract functions (`arrivedAtPickup`, `completeDelivery`) are unlocked for the user's session.

## GPS Accuracy Requirements

To prevent spoofing and ensure fairness:

| Accuracy | Result |
|----------|--------|
| < 15m | **Optimal** - Instant verification |
| 15m - 50m | **Acceptable** - May require 10-second wait for sampling |
| > 50m | **Low** - Verification blocked until signal improves |

## Privacy and Encryption

- **No Tracking**: Horizon does not store raw GPS coordinates on-chain.
- **Encrypted Enclaves**: Location details are only decrypted within the user's local app enclave during active missions.
- **Proof of Transit**: For iTake deliveries, only a "Transit Status" (Yes/No) is recorded on the mission ledger, protecting the customer's exact address from public view.

## Troubleshooting

### "Outside Geofence" Error
- Ensure "High Accuracy" location is enabled in your device settings.
- If in a basement or parking garage, move toward an exit to sync your position.
- The 75m radius is measured from the center pin of the mission; ensure you are at the correct entrance.
