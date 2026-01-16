# 🚀 DEPLOYMENT GUIDE - Axenora AI Website

## ✅ What's Completed

### Frontend Features
- ✅ Loading screen with typewriter effect and founder name
- ✅ Lenis smooth scrolling with parallax effects
- ✅ 3D tilt card effects on feature cards
- ✅ Cookie consent banner (GDPR compliant)
- ✅ WhatsApp chat widget (floating button)
- ✅ AI Chatbot trained with all services and pricing
- ✅ Mobile navigation with scrollbar
- ✅ Payment gateway maintenance page
- ✅ All routes properly configured
- ✅ Responsive design for all devices

### Backend API
- ✅ Express server with security (Helmet, CORS, rate limiting)
- ✅ MongoDB schemas (User, Contact, Newsletter, Booking, Payment, Analytics)
- ✅ Authentication routes (register, login, JWT)
- ✅ Contact form API with email notifications
- ✅ Newsletter subscription system
- ✅ Booking system with time slot validation
- ✅ Payment integration ready (Stripe infrastructure)
- ✅ Analytics tracking endpoints
- ✅ Admin dashboard routes
- ✅ Email service with beautiful HTML templates

## 📦 Build Instructions

### 1. Install Dependencies
```powershell
cd c:\Users\karti\Downloads\axenora-ai-redux-main
npm install
```

### 2. Build for Production
```powershell
npm run build
```

This creates a `dist/` folder with optimized production files.

### 3. Preview Build Locally
```powershell
npm run preview
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. Install Vercel CLI:
```powershell
npm install -g vercel
```

2. Deploy:
```powershell
vercel
```

3. Follow prompts and your site will be live!

### Option 2: Netlify

1. Install Netlify CLI:
```powershell
npm install -g netlify-cli
```

2. Deploy:
```powershell
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

1. Push code to GitHub
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"
4. Build will auto-deploy on push

### Option 4: Any Static Host

Upload the `dist/` folder to any static hosting service:
- AWS S3 + CloudFront
- Google Cloud Storage
- Firebase Hosting
- Cloudflare Pages

## 🔧 Backend Deployment

### Deploy to Render/Railway/Heroku

1. Create account on hosting platform
2. Connect your Git repository
3. Set environment variables from `backend/.env.example`
4. Deploy backend folder

### Environment Variables Needed:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
STRIPE_SECRET_KEY=your_stripe_key
ADMIN_EMAIL=kaarthikdassarorasahabji@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
CLIENT_URL=https://your-frontend-url.com
```

## 🔗 Connect Frontend to Backend

1. Create `.env` file in project root:
```
VITE_API_URL=https://your-backend-url.com/api
```

2. Rebuild:
```powershell
npm run build
```

## 📱 Features Ready to Use

1. **WhatsApp Chat** - Click green button bottom-right
2. **AI Chatbot** - Click purple gradient button bottom-right
3. **Contact Forms** - All forms route to Contact page
4. **Pricing Plans** - Routes to payment maintenance page
5. **Mobile Menu** - Scrollable on small screens
6. **Analytics** - Backend tracking ready

## 🎯 Next Steps

1. ✅ Get MongoDB Atlas account (free tier)
2. ✅ Get Stripe account for payments
3. ✅ Set up Gmail App Password for emails
4. ✅ Deploy frontend to Vercel
5. ✅ Deploy backend to Render
6. ✅ Connect frontend to backend via .env
7. ✅ Test all forms and features
8. ✅ Go live!

## 🐛 Troubleshooting

### Build fails?
```powershell
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Images not loading?
Check that all images exist in `src/assets/` folder.

### API not connecting?
Verify VITE_API_URL in `.env` matches your backend URL.

## 📞 Support

Contact: +91 7814051678
Email: contact@axenora.ai
Founder: Kaarthik Dass Arora

---

**Your website is production-ready and deployable!** 🚀
