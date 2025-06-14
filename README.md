# TennisBook 🎾

TennisBook is a modern web application for booking tennis sessions with professional coaches. Built with Next.js and TypeScript, it provides a seamless experience for users to discover, view details, and book tennis sessions.

## Features

- 📅 Interactive calendar for session browsing
- 👨‍🏫 Professional coach profiles and session details
- 🏟️ Premium tennis court information
- 📱 Responsive design for all devices
- 🔒 Secure authentication system
- ⚡ Real-time session availability
- 🎨 Modern and intuitive user interface

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** React Query
- **Authentication:** NextAuth.js
- **Date Handling:** date-fns
- **API:** RESTful API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tennis-book.git
   cd tennis-book
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tennis-book/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── auth/             # Authentication pages
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   ├── session-card.tsx  # Session card component
│   └── navbar.tsx        # Navigation component
├── lib/                   # Utility functions and API
├── public/               # Static assets
└── styles/               # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [NextAuth.js](https://next-auth.js.org/)
