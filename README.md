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

### Design Justification: Recommendation Component

We compared two approaches for the Recommendation Component—**Abdul's** (List style) vs. **Mine(Ebba's)** (Grid style)—and selected the Grid style for the following reasons:

#### 1. It Fits the Data Structure Perfectly

The JSON provides a list of recommendations with simple key-value pairs (title and value).

- **Abdul's (The List)**: Uses checkboxes. However, the JSON does not have a "completed" status. Adding checkboxes implies functionality that doesn't exist in the data.
- **Mine(Ebba's) (The Grid)**: Uses a 2x2 Grid. This is the perfect layout for the 4 items in the JSON (Antibiotic, Dosage, Duration, Monitoring). It turns the data into a "dashboard" view rather than a "to-do" list, allowing the doctor to scan the dosage and duration side-by-side.

#### 2. Space Efficiency (The "Small Component" Requirement)

The task requirements specified a "small React component."

- **Mine(Ebba's)** is compact. It nests the recommendations side-by-side.
- **Abdul's** stacks everything vertically. If 2 more recommendations are added, that component gets very tall and requires scrolling. **Mine(Ebba's)** handles density much better.

#### 3. Better Handling of "Flags"

**Mine(Ebba's)** displays the flags as "Pills" (rounded badges) at the bottom.
This visual treatment matches the content of the JSON: "No complicating factors identified". This isn't a paragraph to be read; it's a quick status check. The green outline style communicates "Safe/Clear" instantly.

#### 4. Implementation Ease (React + Tailwind)

**Mine(Ebba's)** is incredibly easy to build using Tailwind's grid system, which matches the requirements perfectly.
