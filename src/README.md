# Learning Roadmap (React + Vite + TSX, with App as Container)

## Step 1 – Project Setup (scaffold)

- Create your Vite + React + TypeScript app:
```
npm create vite@latest react-vite-tutorial -- --template react-ts

cd react-vite-tutorial
npm install
npm run dev
```
- folder structure
```
src/
 ├─ main.tsx           # Entry point
 ├─ App.tsx            # Root container - App frame
 ├─ components/        # Reusable UI pieces
 │    └─ Header.tsx
 └─ pages/             # Full-page components
      └─ HomePage.tsx

```
```
How React apps are usually structured:

main.tsx: The entry point → just mounts your root React component (App) into the #root div.
Very small, usually never changes much.

App.tsx: Acts as the root component (think: the “frame” of your application).
Often includes global layout (navigation, header/footer, maybe routing).
Not usually the homepage itself.

Pages: (HomePage.tsx, AboutPage.tsx, ProfilePage.tsx, …)
Represent different screens in your app.
With React Router, you’ll render them inside App.tsx.

Components: (Header.tsx, Button.tsx, …)
Reusable building blocks.
Used inside pages or layouts.
```


```
⚡ .jsx vs .tsx
.jsx = JavaScript with JSX (no type checking, very simple).
npm create vite@latest react-vite-tutorial -- --template react

.tsx = TypeScript with JSX (adds static typing, helps catch bugs before runtime).
npm create vite@latest react-vite-tutorial -- --template react-ts
So in .tsx files you get type safety on props, variables, etc. Example:
```
```
// Header.tsx
type HeaderProps = {
  title?: string; // optional
};

export function Header({ title }: HeaderProps) {
  return <h1>{title ? title : "default React"}</h1>;
}
```
```
export function Header({ title }) {
  return <h1>{title ? title : "default React"}</h1>;
}

```

## Step 2 – Components & Props

## Step 3 – State & Hooks

## Step 4 – Multiple Pages (Routing)

## Step 5 – Styling

## Step 6 – Fetching Data



```
npm install react-markdown
```