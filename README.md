# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Portfolio Redesign — Setup Guide

## What changed

Complete redesign with a **dark editorial** aesthetic:
- Deep dark backgrounds (`#070b14` → `#0d1220` → `#131929`)
- Indigo accent (`#818cf8`) + emerald secondary (`#34d399`)
- Syne (headings) + DM Sans (body) font pairing
- Subtle grid texture overlay across the full page
- Glowing orbs on hero section
- Consistent CSS variables everywhere — no more hardcoded hex values

---

## File structure

Place these files in your project like this:

```
src/
  index.css           ← replace completely
  App.css             ← replace completely
  App.jsx             ← replace completely
  components/
    Header.jsx        ← replace
    Header.css        ← replace
    Hero.jsx          ← replace
    Hero.css          ← replace
    About.jsx         ← replace
    About.css         ← replace
    Skills.jsx        ← replace
    Skills.css        ← replace
    Experience.jsx    ← replace
    Experience.css    ← replace
    Projects.jsx      ← replace
    Projects.css      ← replace
    Education.jsx     ← replace (now exports Education, Certificates, Courses)
    Education.css     ← replace (covers Education + Certificates + Courses)
    Contact.jsx       ← replace
    Contact.css       ← replace (covers Contact + Footer)
    Footer.jsx        ← replace
```

> **Note:** `Education.jsx` now exports 3 components: `Education`, `Certificates`, and `Courses`.
> Import them like: `import { Education, Certificates, Courses } from './components/Education';`

---

## CSS variables reference

All colors come from `index.css` `:root`:

| Variable       | Value     | Usage                        |
|----------------|-----------|------------------------------|
| `--p`          | `#818cf8` | Primary indigo accent        |
| `--p-dim`      | `#4f46e5` | Darker indigo (hover states) |
| `--p-glow`     | 18% alpha | Glow backgrounds             |
| `--s`          | `#34d399` | Secondary emerald            |
| `--bg`         | `#070b14` | Darkest background           |
| `--bg2`        | `#0d1220` | Surface background           |
| `--bg3`        | `#131929` | Elevated surface             |
| `--bg4`        | `#1a2236` | Highest surface              |
| `--tx`         | `#e8edf5` | Primary text                 |
| `--tx2`        | `#8892a4` | Secondary text (muted)       |
| `--tx3`        | `#3d4a60` | Tertiary text (hints)        |
| `--bd`         | 7% white  | Default border               |
| `--bd2`        | 12% white | Stronger border              |
| `--bd-p`       | 30% indigo| Accent border (on hover)     |

---

## Fonts

Add this to your `index.html` `<head>` if not already loading Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
```

Also add Fira Code for the code window:
```html
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
```