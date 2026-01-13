# PathoCare Website - Next.js Project

A modern Next.js website for PathoCare healthcare services.

## 📁 Project Structure

```
patho/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── public/                 # Static assets (IMPORTANT: Place your logo here!)
│   └── logo.png           # Your PathoCare logo (add this file)
├── components/             # Reusable React components (create as needed)
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.js         # Next.js configuration
```

## 🚀 Step-by-Step Setup Instructions

### Step 1: Install Dependencies
Open your terminal in this folder and run:
```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint

### Step 2: Add Your Logo
1. **Create the `public` folder** if it doesn't exist (it should be created automatically)
2. **Place your logo file** in the `public` folder
   - Recommended formats: PNG, SVG, or JPG
   - Recommended name: `logo.png` (or update the path in `app/page.tsx` if you use a different name)
   - For best quality, use a PNG with transparent background
   - Recommended size: At least 512x512 pixels for high-resolution displays

### Step 3: Start Development Server
Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your website.

### Step 4: Build for Production
When ready to deploy:
```bash
npm run build
npm start
```

## 📍 Logo Placement

**Your logo should be placed in:**
```
public/logo.png
```

**To use your logo in components:**
```tsx
import Image from "next/image";

<Image
  src="/logo.png"
  alt="PathoCare Logo"
  width={256}
  height={256}
/>
```

Note: Files in the `public` folder are served from the root URL path (`/`), so `/logo.png` refers to `public/logo.png`.

## 🛠️ Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build the project for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## 📝 Next Steps

1. **Add your logo** to the `public` folder
2. **Customize the home page** in `app/page.tsx`
3. **Add more pages** by creating new files in the `app` directory
4. **Create reusable components** in a `components` folder
5. **Customize styling** in `app/globals.css` and `tailwind.config.ts`

## 🎨 Styling

This project uses:
- **Tailwind CSS** for utility-first styling
- **CSS Modules** support (create `*.module.css` files)
- **Dark mode** support (automatic based on system preferences)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ⚠️ Important Notes

- The logo path in `app/page.tsx` is set to `/logo.png` - make sure your logo file matches this name or update the path
- All images should be optimized using Next.js Image component for better performance
- The project uses TypeScript for type safety
