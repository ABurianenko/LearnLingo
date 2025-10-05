# LearnLingo — React app for finding language tutors

A single-page app where users can browse tutors, filter by language/level, add favorites, and book a trial lesson. It uses Firebase (Auth, Realtime Database, Firestore), Redux Toolkit, React Router, and react-hook-form with Yup.

## Features

- **Auth modals** (login/register) with validation (react-hook-form + Yup)
- **Booking modal** to submit a trial-lesson request (stored in Firestore)
- **Tutors list** loaded from **Firebase Realtime Database**
- **Filters** by language and level (reactive, no submit button)
- **Pagination** with “Load more” + smooth scroll to newly loaded item
- **Favorites** (localStorage) with auth guard modal
- **Skeletons** while fetching (filters + cards)
- **Global theming** + page-specific background (teachers page)
- **Accessible modals**: ESC/backdrop/close button + focus trap + return focus
- **Deep-linkable auth routes** (`/login`, `/register`) with return navigation

---

## Tech Stack

- React 18, React Router
- Redux Toolkit (+ RTK Thunks), react-redux
- Firebase: Auth, Realtime Database, Firestore
- react-hook-form, Yup
- react-hot-toast
- Vite (recommended) or CRA
- CSS Modules

---

## Prerequisites

A Firebase project with:

- **Realtime Database** (for `teachers`)
- **Firestore** (for `bookings`)
- **Authentication** (Email/Password)

---

## Getting Started

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview production build
npm run preview
```

# Project Structure (key parts)

src/
components/
TeacherCard/
TeacherList/
TeacherFilters/
pages/
Home/
Teachers/
Favourites/
redux/
auth/
modal/
teachers/
favorites/
languages/
filters/
firebase/
config.js
data-reader.js
booking.js
ui/
ModalWrap/
SubmitBtn/
Favorite/
Skeleton/
hooks/
useModal.js
utils/
teacherKey.js
App.jsx
main.jsx

# State & Data Flow (high level)

- Teachers slice:

  - holds paginated `items`, `loading`, `error`, `page`, `totalPages`.

- Filters slice:

  - `{ language, level }`.

- Languages slice:

  - derives list of languages from teachers (once) or from DB.

- Favorites slice:

  - stores teacher keys in Redux + persists in `localStorage`.

- Modals slice:
  - which modal is open (`auth`, `book`, `authRequired`)
  - contextual data (e.g., `booked teacher`).

# Fetching

- `fetchTeachers({ limit, page })`
  - reads from Realtime DB
  - applies filters inside the thunk (by reading `state.filters`)
  - returns **paginated & filtered** list
  - “Load more” appends to `items`.

# Modals

- `<ModalWrap>` provides:

  - Backdrop click to close
  - ESC to close
  - Focus trap + return to previously focused element
  - Optional `queryKey` to sync with URL for route-based modals (`/login`, `/register`)

- `AuthRequiredModal`

  - opens when a non-logged user clicks “favorite”.

- `AuthModal` (rendered via routes):

  - `/login` → `<AuthModal mode="login" />`
  - `/register` → `<AuthModal mode="register" />`
  - navigates back to `location.state.from` after close/success.

- `BookingForm`
  - rendered globally (outside routes)
  - does **not** change the URL; closing keeps you on the same page.

# Theming & Layout

- Root sets `data-theme` (e.g., `yellow`, `green`, `blue`, etc.)
- Page background can be overridden via dataset (e.g., teachers page).
- Header is sticky; modals account for header height via CSS vars.

# Favorites (auth guard)

- Clicking the heart:
  - If **not logged in** → show `AuthRequiredModal` with links to Login/Register.
  - If **logged in** → toggle favorite in Redux + persist to `localStorage`.
- Favorites page is behind `PrivateRoute`.

# Accessibility

- Modals are `role="dialog"`, `aria-modal="true"`, labelled by title.
- Focus trapping & return focus implemented in `useModal`.
- ESC/backdrop/close-button all close the modal.
- Buttons/links have `aria-pressed` or meaningful text.

# License

MIT — do whatever you want, but no warranty.
