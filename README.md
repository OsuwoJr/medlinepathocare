# Medline Pathocare - Diagnostic Laboratory Website

A modern, accessible Next.js website for Medline Pathocare, a leading referral laboratory providing diagnostic services in Nairobi, Kenya.

## 🏥 About

Medline Pathocare is a diagnostic laboratory founded in 2025 by Sir. Granton Trevar, specializing in comprehensive diagnostic services from routine testing to complex and esoteric testing. The laboratory is accredited and certified by KMLTTB, serving a network of over 20 clinical partners across Nairobi.

## ✨ Features

### Core Features
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Complete dark mode support with smooth transitions
- **Accessibility**: 
  - High contrast mode for better readability
  - Font size controls (Normal, Large, Extra Large)
  - Keyboard navigation support
  - ARIA labels for screen readers
- **Test Catalog**: Comprehensive, searchable catalog of 55+ diagnostic tests with pricing
- **Modern UI/UX**: Clean, professional design matching medical/scientific aesthetic

### Pages & Sections
- **Home Page**: Hero section, mission & vision, history, services overview, quality & compliance, contact
- **About Page**: Detailed information about the laboratory
- **Services Page**: Overview of services with links to test catalog
- **Test Catalog**: Searchable list of all available diagnostic tests
- **Contact Page**: Contact information and support details
- **Blog Page**: News and updates section (ready for content)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Git

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd patho
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
patho/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles and theme variables
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── services/
│   │   ├── page.tsx             # Services overview
│   │   └── test-catalog/
│   │       └── page.tsx         # Test catalog with search
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   └── blog/
│       └── page.tsx             # Blog/News page
├── components/                    # React components
│   ├── Navigation.tsx           # Main navigation bar
│   ├── TestCard.tsx             # Test card component
│   ├── ThemeProvider.tsx        # Theme management (dark mode, contrast, font size)
│   ├── AccessibilityControls.tsx # Accessibility controls panel
│   └── Providers.tsx            # Client component wrapper
├── data/                          # Data files
│   └── tests.ts                  # Test catalog data (55+ tests)
├── public/                        # Static assets
│   ├── logo.png                 # Main logo
│   ├── favicon.ico              # Favicon
│   ├── favicon-*.png            # Various favicon sizes
│   ├── apple-touch-icon.png     # iOS icon
│   ├── android-chrome-*.png     # Android icons
│   └── site.webmanifest         # Web app manifest
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── next.config.js                # Next.js configuration
```

## 🎨 Branding & Colors

### Color Palette
- **Primary (Turquoise Blue)**: `#00bcd4` - Main brand color
- **Accent (Orange)**: `#ff9800` - Used for taglines and highlights
- **Background Light**: `#fafafa` - Clean white background
- **Background Dark**: `#0a0a0a` - Deep black for dark mode

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Sizes**: Configurable (Normal, Large, Extra Large)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Theme Customization

Theme settings are managed in `components/ThemeProvider.tsx`:
- Dark/Light mode toggle
- High contrast mode
- Font size controls
- Preferences saved to localStorage

### Adding New Tests

Edit `data/tests.ts` to add new tests to the catalog:

```typescript
{
  id: 'unique-id',
  title: 'Test Name',
  description: 'Test description',
  price: 1000.00,
  image: '/path/to/image.png' // Optional
}
```

### Adding New Pages

Create a new directory in `app/` with a `page.tsx` file:

```
app/new-page/
  └── page.tsx
```

This automatically creates a route at `/new-page`.

## ♿ Accessibility Features

- **Dark Mode**: Toggle between light and dark themes
- **High Contrast**: Enhanced contrast mode for better readability
- **Font Size**: Three size options (Normal, Large, Extra Large)
- **Keyboard Navigation**: Full keyboard support throughout
- **Focus Indicators**: Clear focus states for all interactive elements
- **ARIA Labels**: Proper labels for screen readers

Accessibility controls are available as a floating button in the bottom-right corner.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (3 column layout)

## 🔐 SEO & Metadata

- Optimized meta tags for search engines
- Proper Open Graph tags
- Favicon and app icons for all platforms
- Web app manifest for PWA support

## 📞 Contact Information

**Medline Pathocare**
- Location: Roysambu, Nairobi, Kenya
- Accreditation: KMLTTB

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically on push

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is proprietary and confidential.

## 👥 Credits

- **Founder**: Sir. Granton Trevar
- **Established**: 2025
- **Location**: Roysambu, Nairobi, Kenya

## 🔄 Version History

- **v0.1.0** - Initial release with core features
  - Home page with all sections
  - Test catalog with 55+ tests
  - Dark mode and accessibility features
  - Responsive design

## 🤝 Contributing

This is a private project. For internal development:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📧 Support

For technical support or questions about the website, please contact the development team.

---

**Built with ❤️ for Medline Pathocare**
