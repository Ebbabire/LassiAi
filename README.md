# LassiAI - Clinical Case Management

A professional veterinary clinical case management interface built with React and Tailwind CSS. This project demonstrates a clean, master-detail architecture for managing patient intake, clinical history, and AI-driven recommendations.

## 🚀 Features

- **Split View Architecture**: A responsive Master-Detail interface that handles case lists and detailed clinical views side-by-side.
- **Clinical UI Primitives**: Modular, reusable UI components including Status Badges, Clinical Flags, and Skeletons located in `components/ui`.
- **Recommendation Engine UI**: dedicated components for displaying AI-driven clinical recommendations and loading states.
- **Smart Sorting & Filtering**: Built-in sorting functionality for case history.
- **Type Safety**: Centralized TypeScript definitions for robust data handling.
- **Responsive Design**: Adapts seamlessly from mobile stack views to desktop split views.

## 🛠 Project Structure

The project is organized by feature domain (`pages/case`) and shared utilities (`components/ui`, `hooks`, `data`).

```
src/
├── components/
│   └── ui/                  # Shared primitive components
│       ├── ClinicalFlag.tsx # Critical alerts/flags
│       ├── StatusBadge.tsx  # Case status indicators
│       ├── Skeleton.tsx     # Loading placeholders
│       └── ...              # Layout, Navbar, Headers
├── data/                    # Mock data and static content
├── hooks/                   # Custom hooks (e.g., useDebounce)
├── pages/
│   └── case/                # Case Management Feature Module
│       ├── components/      # Domain-specific components
│       │   ├── CaseList.tsx           # Sidebar list view
│       │   ├── CaseDetail.tsx         # Main detail panel
│       │   ├── RecommendationCard.tsx # AI suggestion cards
│       │   └── ...
│       └── Cases.tsx        # Main page controller
├── type/                    # Shared TypeScript definitions
├── App.tsx                  # Main application layout
└── main.tsx                 # Entry point
```

## 📦 Setup & Usage

1. **Install Dependencies**
   Ensure you have a React environment set up with Tailwind CSS configured.

2. **Run the App**
   The application entry point is `main.tsx`, which mounts the `Cases` page via `App.tsx`.

## 🎨 Design System

### Visual Language

- **Palette**: Uses a `slate` (gray-blue) foundation for a sterile, clinical feel, accented by semantic colors (Blue, Amber, Emerald) for status indicators.
- **Typography**: `Inter` font family for high legibility in data-dense views.

### Component Organization

- **Pages**: Top-level views (e.g., `Cases.tsx`) act as controllers, managing state and layout.
- **UI Components**: Dumb, presentational components (buttons, badges) are isolated in `src/components/ui` for reuse.
- **Feature Components**: Complex, domain-specific logic (e.g., `RecommendationPanel`) lives within the feature directory `src/pages/case/components`.
