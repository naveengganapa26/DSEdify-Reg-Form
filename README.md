# Student Registration Form (Stepper Form)

This project is a **Student Registration Form** implemented as a stepper form using **Next.js**. It adheres to best practices for web development, including modular architecture, responsiveness, and scalability.

## Features

- **Stepper Form:** A multi-step registration form with smooth transitions between steps.
- **Validation:** All input fields are validated using regular expressions, ensuring robust data entry.
- **Dynamic Rendering:** A parent component dynamically renders only the part of the form relevant to the current step.
- **Mobile Responsiveness:** Fully optimized for mobile devices using **Material-UI (MUI)** components.
- **Styling:** Styles are written in SCSS, following the **BEM (Block Element Modifier)** methodology for maintainable and reusable styles.
- **Internationalization:** Supports multi-language capabilities with a dedicated `en.json` file. Translation to other languages can be added as needed.

## Project Structure

The project follows the **Atomic Design Principle** with the following organization:
- **Constants:** Separate files for managing constants.
- **Utils:** Includes reusable utility functions, such as regex for validation.
- **Components:** Atomic components categorized as atoms, molecules, and organisms.

## Technologies Used

- **Next.js:** Framework for server-rendered React applications.
- **SCSS:** Styling with BEM methodology.
- **MUI:** Material-UI for building a responsive UI.
- **Netlify:** Hosting for live deployment.

## Key Highlights

1. **Parent Component Architecture:** 
   - A parent component renders only the relevant parts of the form at each step, improving performance and user experience.

2. **Validation:** 
   - All form fields are rigorously validated using regular expressions defined in utility files.

3. **Internationalization:**
   - Primary language configurations are in `en.json`, enabling easy translation for global audiences.

4. **Hosting:** 
   - The project is live and can be accessed on **Netlify**.

## Deployment

The project is deployed and accessible via Vercel. To view the live demo, visit the hosted application link provided in the repository.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

