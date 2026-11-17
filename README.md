# Travel Pack

Plan your trips, keep track of the details, and build a packing list for every
adventure.

[**Open the live app**](https://mintyfreshbun.github.io/Travel-Pack/)

## What you can do

- Create trips with destinations, travel dates, and a status.
- Edit, sort, and manage your trips from one dashboard.
- Add packing-list items, adjust their quantities, and mark them packed.
- Keep your trip data in your browser with local storage.

## Get started

Make sure Node.js and npm are installed, then run:

```sh
npm install
npm run dev
```

Vite will print a local URL where you can open the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Built with

React, Vite, Sass, Bulma, and Lucide icons.

## Project structure

```text
src/
  components/   App screens and reusable UI
  styles/       Sass styles organized by UI area
  App.jsx       Application entry component
  App.scss      Global stylesheet imports
```

## Data and privacy

Trips are saved in the browser's local storage. They are available in the same
browser and device, and are not synced to an account or other devices.
