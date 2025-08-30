# 🌌 Vistara AI

Vistara AI is your **AI-powered trading companion**, designed to simplify technical analysis and provide intelligent insights for smarter decision-making.  
Built with **React + Firebase + Razorpay + TailwindCSS**, it offers a seamless experience with modern design and secure login.

---

## 🚀 Features

- 🔑 **Secure Authentication** (Google & Email login via Firebase)  
- 📊 **AI-powered Trading Insights**  
- 💳 **Subscription Plans** (Razorpay / PayPal integration)  
- 🎨 **Modern UI/UX** with TailwindCSS  
- ☁️ **Deployed on Render** (auto-deploys on push to GitHub)  
- 🔒 **Environment-based configuration** (no exposed API keys)  

---

## 📂 Project Structure

Vistara_Ai/
│── public/ # Static assets
│── src/
│ ├── components/ # React components (LandingPage, Pricing, Login, etc.)
│ ├── firebase.js # Firebase configuration & auth methods
│ ├── App.js # Main app router & state
│ └── index.js # Entry point
│── .gitignore
│── package.json
│── tailwind.config.js


---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PritamCodex/Vistara_Ai.git
cd Vistara_Ai
```

2️⃣ Install Dependencies
```bash
npm install
```

3️⃣ Environment Setup
Create a .env file in the root directory:
```bash
# Firebase
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxxxx
REACT_APP_FIREBASE_APP_ID=xxxxxxx
REACT_APP_FIREBASE_MEASUREMENT_ID=xxxxxxx

# Razorpay
REACT_APP_RAZORPAY_KEY=your-razorpay-key
```

4️⃣ Run Locally (Development)
```bash
npm start
```

5️⃣ Build for Production
```bash
npm run build
npx serve -s build
```

🌐 Deployment

We use Render for hosting.
Build Command: npm install && npm run build
Start Command: npx serve -s build
Add all .env variables in Render Dashboard → Environment.

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.

⭐ Support
If you find this project useful, consider leaving a ⭐ on the repo to help others discover it!
