# View Restaurants Landing Page

This project is a simple landing page to view a list of restaurants. Users are able to view, search by name/rating, and add any restaurant to their favorites.

## Main Tech Stack

- React: A JavaScript library for building user interfaces and client side components.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Next.js: A React framework for sever-side rendering.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- Material UI: A React component library to create visually appealing and consistent user interfaces in React applications.
- TRPC: Use edge functions in Nextjs to serve trpc endpoint.
- PostgreSQL: Database to store restaurant data.
- Prisma: The ORM for database interactions.

## Directory/Folder Structure

Here's an overview of the project's directory structure and the purpose of each directory/file:

- `.next/`: Contains build output and cache files generated by Next.js. Not checked into version control.
- `.vscode/`: Contains Visual Studio Code configuration files, such as settings and recommended extensions.
- `app/`: Contains the main application code, including pages, API routes, components, and global styles.
  - `api/`: Backend API routes.
  - `components/`: Reusable React components.
  - `restaurants/`: Container and Presentational components for view restaurants page.
  - `share/`: Shared constants, route url, etc.
  - `globals.css`: Global CSS styles.
  - `layout.tsx`, `page.tsx`: Layout and page components for the application.
- `lib/`: Shared libraries and utility functions for db.
- `mock/`: Mock data for development and testing.
- `prisma/`: Prisma ORM configuration and schema files for database interactions.
- `public/`: Static files like icons, images, fonts, etc., accessible at the root URL.
- `server/`: Server side actions for getting and updating favorite restaurants.
- `utils/`: Utility functions and helpers for query and trpc.
- `.dockerignore`, `.env`, `.eslintrc.cjs`, `.gitignore`, `next-env.d.ts`, `next.config.mjs`, `package.json`, `postcss.config.mjs`, `prettier.config.cjs`, `tailwind.config.ts`, `tsconfig.json`: Configuration files for Docker, environment variables, ESLint, Git, Next.js, npm/yarn, PostCSS, Prettier, Tailwind CSS, and TypeScript.
- `compose.yaml`, `Dockerfile`: Docker configuration files for containerizing the application.
- `README.md`, `README.Docker.md`: Documentation files.

## Workflow/Interaction between FE and BE

This project uses Next.js, which allows for both server-side rendering (SSR) and static site generation (SSG), alongside client-side rendering. Here's how the front end (FE) and back end (BE) interact:

1. **Next.js as the Foundation**: 
- Server-Side Rendering (SSR) and Static Site Generation (SSG): Next.js is utilized for its capabilities in SSR and SSG, which allows for pre-rendering pages on the server before sending them to the client. This improves performance and SEO.
- API Routes: Next.js API routes (`app/api/`) are used to define server-side logic and endpoints. These routes can interact with the database or perform other server-side operations and are accessible to the front end via HTTP requests.
2. **tRPC for Type-Safe API Calls**:
- Setup and Configuration: The `TrpcProvider` component wraps the application's root component to set up the tRPC client. This setup includes configuring the API endpoint and integrating with React Query for caching and state management.
- Client-Server Interaction: tRPC allows for creating type-safe API routes without the need for manually defining request and response types. It's used in this project to facilitate communication between the Next.js API routes and the React front end, ensuring that the data exchanged between the FE and BE is type-safe.
3. **Prisma for Database Interactions**: 
- Configuration and ORM: Prisma is configured in the `prisma/` directory and is used as an Object-Relational Mapper (ORM) for interacting with the PostgreSQL database. The `prisma-client` is instantiated as a singleton to ensure only one instance exists throughout the application lifecycle, improving performance and resource management.
- Database Schema: The `schema.prisma` file defines the database schema, including the `RestaurantRecord` model, which represents the structure of the restaurant records stored in the PostgreSQL database.
- Database Access: The prisma client is used in the server-side logic (e.g., API routes) to perform CRUD operations on the database, such as fetching and updating restaurant records.
4. **React Components for the UI**: 
- Reusable Components: The `app/components/` directory contains reusable React components that are used to build the user interface. These components interact with the API routes (via tRPC) to fetch or manipulate data.
- Restaurants List UI: The `RestaurantsList` component, as presentational component, is used to display a list of restaurants. It gets restaurant data from the page container which using tRPC and displays it in a user-friendly manner.

## How to Start the Project

To get the project up and running on your local machine, follow these steps:

1. **Clone the repo to your local and checkout the main branch**:
  git clone https://github.com/deantran98/view-restaurant.git
  cd view-restaurant
  git checkout main
2. **Build and run the application using Docker Compose as described in README.Docker.md**:
  docker compose up --build
3. **Install Dependencies**:
  ```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
4. **Run the Development Server**:
  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
5. **Add mock data locally to Prisma Studio**:
  npx prisma studio
