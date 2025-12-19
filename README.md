# Seating Map App
## Architecture & Trade-offs
### Core Stack
- **React 18 & TypeScript**: Ensures a robust, type-safe development environment with the latest React features.
- **Vite**: Utilized for lightning-fast HMR and building.
### Rendering Strategy
- **SVG-based Seat Map**:
  - *Pros*: Excellent visual fidelity, infinite scalability, and native accessibility.
  - *Cons*: High DOM node count for massive venues.
  - *Mitigation*: **Memoization (`React.memo`)** is aggressively used on seat components to prevent unnecessary re-renders, balancing pure SVG simplicity against the complexity of a Canvas-based solution.
### State Management
- **Context API + Reducer**:
  - Used for global state (`SeatSelectionContext`) to avoid the overhead of Redux.
  - *Trade-off*: Requires careful optimization to minimize re-renders across the provider's subtree.
### Data Persistence
- **LocalStorage**:
  - Provides immediate session persistence for selected seats without a backend dependency for this demo.
## Getting Started & Usage
1. **Install Dependencies**: `pnpm install`
2. **Start Development Server**: `pnpm dev`
3. **Usage**:
   - **Select Seats**: Click or use keyboard to select up to **8 seats**.
   - **Persistence**: Your selection is saved automatically.
## Incomplete TODOs
- [ ] **Reset Button**: A feature to clear all selected seats simultaneously is planned but not yet implemented.
