# Malayalam Islamic History

A Next.js web application showcasing Islamic stories, categorized into Quran Stories, Prophet Stories, Khaleefa Stories, and Swahabi Stories.

## Website
[www.islamichistory.in](https://www.islamichistory.in)

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Accessibility Features**: High contrast mode, font size adjustments, and more
- **Story Categories**: Organized into 4 main categories
- **Search Functionality**: Search across all stories by title, description, content, and tags
- **Keyboard Shortcuts**: Navigation and accessibility features via keyboard shortcuts
- **Footer with Copyright**: Includes a comprehensive footer with DHIL Tech copyright

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dhiltech/islamic-history.git
   cd islamic-history
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create required directories:
   ```bash
   mkdir -p public/images
   ```

4. Add images for stories in the `/public/images` directory with filenames matching those referenced in the story data files:
   - `/public/images/quran001.jpg`, `/public/images/quran002.jpg`, etc.
   - `/public/images/prophet001.jpg`, `/public/images/prophet002.jpg`, etc.
   - `/public/images/khaleefa001.jpg`, `/public/images/khaleefa002.jpg`, etc.
   - `/public/images/swahabi001.jpg`, `/public/images/swahabi002.jpg`, etc.
   - `/public/images/placeholder.png` (fallback image)

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running in Production

```bash
npm start
# or
yarn start
```

## Deployment to GitHub Pages

### Automatic Deployment (GitHub Actions)

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by a GitHub Actions workflow:

1. Push your changes to the main branch
2. GitHub Actions will automatically:
   - Build the Next.js application
   - Export static files
   - Deploy to the gh-pages branch
   - Make the site available at https://[username].github.io/IslamicHistory

### Manual Deployment

To manually deploy the application to GitHub Pages:

1. Install development dependencies:
   ```bash
   npm install
   ```

2. Build and deploy the application:
   ```bash
   npm run deploy
   ```

3. The site will be deployed to the gh-pages branch and available at https://[username].github.io/IslamicHistory

### First-time Setup

If you're setting up GitHub Pages for the first time:

1. Ensure your repository has a gh-pages branch (created automatically by the deployment process)
2. Go to your repository settings → Pages
3. Set the Source to "Deploy from a branch"
4. Select the gh-pages branch and set the folder to / (root)
5. Save the settings

## Project Structure

```
islamic-history/
├── app/                      # Next.js App Router
│   ├── components/           # Reusable components
│   │   └── Footer.js         # Site footer with copyright
│   ├── context/              # React Context providers
│   ├── data/                 # Story data files
│   │   ├── quranStories.js   # Quran stories data
│   │   ├── prophetStories.js # Prophet stories data
│   │   ├── khaleefaStories.js# Khaleefa stories data
│   │   ├── swahabiStories.js # Swahabi stories data
│   │   └── stories.js        # Combined stories for backward compatibility
│   ├── utils/                # Utility functions
│   ├── [category]-stories/   # Dynamic routes for story categories
│   │   └── [id]/             # Dynamic routes for individual stories
│   ├── layout.js             # Root layout with metadata
│   ├── ClientLayout.js       # Client-side layout with UI controls
│   ├── page.js               # Home page
│   └── globals.css           # Global styles
├── public/                   # Static files
│   └── images/               # Story images
└── next.config.js            # Next.js configuration
```

## Keyboard Shortcuts

- `Alt+1`: Toggle dark mode
- `Alt+2`: Toggle high contrast mode
- `Alt+3`: Increase font size
- `Alt+4`: Decrease font size
- `Alt+5`: Reset font size
- `Alt+6`: Toggle dyslexia friendly font
- `Alt+0`: Reset all settings
- `Alt+h`: Toggle help dialog

## Customization

### Adding New Stories

1. Add new story data to the appropriate file in `app/data/` directory
2. Place corresponding images in the `public/images/` directory

### Modifying Themes

Adjust theme variables in `app/globals.css` to customize colors, fonts, and other styling elements.

## License

[MIT License](LICENSE)

## Copyright

© 2024 DHIL Tech. All rights reserved.

## Contact

For any inquiries, please contact us at [info@islamichistory.in](mailto:info@islamichistory.in)

## Acknowledgements

- All stories are from Islamic history and literature
- Font Awesome for icons
- OpenDyslexic font for accessibility 