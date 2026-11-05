# Travel-Pack

A trip-planning dashboard built with React and Vite. Create and edit trips,
track their status and dates, and keep a separate packing list for each trip.
Trips are saved in your browser using local storage.

## Project structure

The app entry point is `src/App.jsx`. Its screen components live in
`src/components/`, and Sass is organized by UI area in `src/styles/`.
`src/App.scss` loads Bulma and the app style modules.

## Color palette

The app's named color variables are centralized in the `:root` block in
`src/styles/_base.scss`. Adjust those values to change the theme; component
styles reference the variables instead of defining their own colors.

## Development

```sh
npm install
npm run dev
npm run lint
npm run build
```
