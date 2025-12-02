# Matalan - Feel Yourself

Interactive lookbook prototype for Matalan's rebrand. A scroll-driven experience that syncs fabric close-up videos with model videos.

![Preview](assets/images/preview.png)

## 🎯 Concept

Split-screen experience where:
- **Left panel**: AI-generated fabric zoom videos + product info
- **Right panel**: Model 360° turntable videos
- **Scroll = Scrub**: Both videos play in sync as user scrolls

## 🚀 Quick Start

1. Clone this repo
2. Open `index.html` in a browser (or use Live Server)
3. Scroll to explore!

```bash
git clone https://github.com/YOUR_USERNAME/matalan-feel-yourself.git
cd matalan-feel-yourself
# Open index.html or use VS Code Live Server
```

## 📁 Project Structure

```
matalan-feel-yourself/
├── index.html              # Main HTML
├── css/
│   └── styles.css          # All styles
├── js/
│   └── app.js              # Scroll & video logic
├── assets/
│   ├── videos/             # Your video files go here
│   │   ├── fabric-knit.mp4
│   │   ├── fabric-linen.mp4
│   │   ├── fabric-denim.mp4
│   │   ├── fabric-satin.mp4
│   │   ├── model-cardigan.mp4
│   │   ├── model-blazer.mp4
│   │   ├── model-jeans.mp4
│   │   └── model-dress.mp4
│   └── images/
│       └── favicon.svg
└── README.md
```

## 🎬 Creating the Videos

### Fabric Zoom Videos (Left Panel)

Use AI video generation tools:

**Kling 1.5 / Runway Gen-3 / Pika Labs**

Example prompts:
```
Product 1 (Cardigan):
"Extreme close-up of soft pink knit fabric, macro lens, gentle ripple movement, soft studio lighting, 4K, seamless loop"

Product 2 (Blazer):
"Cinematic macro pan across lilac linen weave, shallow depth of field, luxury fashion ad, slow motion"

Product 3 (Jeans):
"Close-up of blue denim texture, selvedge detail visible, subtle movement, studio lighting"

Product 4 (Dress):
"Black satin fabric flowing in slow motion, reflective highlights, elegant movement, macro lens"
```

### Model Videos (Right Panel)

**Option A: Real Shoot (Best)**
- Motorized turntable (£80/day rental)
- Red seamless paper backdrop
- 10-second rotation, model holds pose

**Option B: AI Generation (Kling AI)**
```
"Fashion model slowly rotating on turntable, red studio background, editorial lighting, wearing [garment], smooth 360 rotation"
```

**Option C: Multi-angle Crossfade**
- Shoot 3-4 angles (front, 3/4, side, back)
- Animate each slightly in Runway
- Crossfade between them

## 🎨 Design Tokens

```css
/* Colors */
--matalan-red: #C41E3A;
--cream: #FAF8F5;
--charcoal: #1C1C1C;
--dark-bg: #120808;

/* Typography */
Headlines: Cormorant (serif, italic for "It's")
Body: Work Sans (sans-serif)

/* Logo Treatment */
"It's" = Cormorant italic
"MATALAN" = Work Sans, letter-spacing: 0.15em
Red box version: #C41E3A background, white text
```

## 📱 Responsive

- Desktop: Side-by-side panels
- Tablet/Mobile: Stacked vertically

## 🔧 Customization

### Adding Products

1. Add video files to `assets/videos/`
2. Update `index.html` with new `<video>` elements
3. Add product card HTML
4. Update `CONFIG.products` array in `app.js`

### Changing Taglines

Edit `js/app.js`:
```javascript
const CONFIG = {
    products: [
        { tagline: "IT'S COSY SEASON" },
        { tagline: "IT'S BUSINESS READY" },
        // Add more...
    ]
};
```

## 📦 Deployment

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from main branch
3. Your site will be at `https://username.github.io/matalan-feel-yourself`

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
Drag and drop the folder to netlify.com/drop

## 🎥 Video Specs

For best performance:
- Format: MP4 (H.264)
- Resolution: 1080p or 720p
- Duration: 4-10 seconds
- Size: Under 5MB per video
- Loopable (first/last frames match)

## 📝 Credits

- Design: Droga5 London
- Development: [Your Name]
- Fonts: Google Fonts (Cormorant, Work Sans)
- Placeholder videos: Mixkit

## 📄 License

For Matalan internal use / prototype purposes.
