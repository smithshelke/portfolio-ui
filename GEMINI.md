# GEMINI.md

## Project Overview

This is a portfolio website built with Next.js, a popular React framework. The project is set up to use TypeScript for type safety, Tailwind CSS for styling, and ShadCN UI for UI components. It also includes `lucide-react` for icons. The project is configured to use the Geist font.

The project is structured as a standard Next.js App Router application:

-   `app/layout.tsx`: The root layout of the application.
-   `app/page.tsx`: The main landing page of the portfolio.
-   `app/dashboard/page.tsx`: A dashboard page, which includes a sidebar and breadcrumbs.
-   `components/`: Contains the reusable React components, with ShadCN UI components in `components/ui`.
-   `public/`: Static assets like images and SVGs.

## Building and Running

The following scripts are available in `package.json` to run and build the project:

-   **`npm run dev`**: Starts the development server with Turbopack at `http://localhost:3000`.
-   **`npm run build`**: Builds the application for production.
-   **`npm run start`**: Starts the production server.
-   **`npm run lint`**: Lints the codebase using ESLint.

## Development Conventions

-   **UI Components**: The project uses [ShadCN UI](https://ui.shadcn.com/) components, which are built on top of Radix UI. When adding new UI elements, it is recommended to use or create components that follow the same style and architecture.
-   **Styling**: Styling is done using [Tailwind CSS](https://tailwindcss.com/). It is recommended to use utility classes for styling and to define custom styles in `app/globals.css`.
-   **Icons**: The project uses [`lucide-react`](https://lucide.dev/guide/packages/lucide-react) for icons.
-   **Fonts**: The project uses the "Geist" font, which is loaded via `next/font`.
-   **Linting**: The project is set up with ESLint for code quality. It is recommended to run `npm run lint` before committing changes.

## Gemini Added Memories
- Do not alter components added by the shadcn cli in the components folder
- Do not make any changes to the base components provided by the shadcn library. If its really important to alter the base components ask for permission twice.
- Do not use git commands without my persmission
- Stop committing to git on your own. Do not stage/unstage on your own.
