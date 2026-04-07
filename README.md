# 🌌 Vistara AI – AI-Powered Trading Decision System

Vistara AI is an **AI-driven trading workflow system** that analyzes charts, identifies trade setups, and generates structured trading decisions with clear reasoning.

The system is designed to **automate technical analysis**, reduce emotional bias, and improve consistency in decision-making.

---

## 🚀 Core Features

- 📊 **AI-Based Trade Analysis**
  - Detects support, resistance, and patterns  
  - Generates entry, stop-loss, and take-profit levels  
  - Provides reasoning behind each trade  

- 🔄 **End-to-End Workflow Automation**
  - Input → Chart / data ingestion  
  - Processing → AI analysis  
  - Output → Trade decision  

- ⚠️ **Trade Validation Layer**
  - Filters weak setups  
  - Avoids low-probability trades  

- 🧠 **Reasoning Engine**
  - Explains why a trade should be taken or rejected  

---

## 🏗️ System Architecture
Chart Input / Screenshot
↓
Data Processing Layer
↓
AI Analysis Engine
(Gemini / Local Models)
↓
Decision Logic Layer
(Rules + Validation)
↓
Trade Output System
(Entry / SL / TP + Reason)


---

## 🛠️ Tech Stack

- **Frontend**: React + TailwindCSS  
- **Backend / Logic**: JavaScript  
- **AI Models**:
  - Gemini API  
  - Hugging Face (local models)  
- **Auth & Database**: Firebase  
- **Payments**: Razorpay / PayPal  
- **Deployment**: Render  

---

## ⚡ Example Output
Trade: BUY
Entry: 1.2450
Stop Loss: 1.2400
Take Profit: 1.2550

Reason:

Strong support zone
Bullish structure break
Momentum confirmation


---

## 🎯 Problem Solved

Manual trading often leads to:
- Inconsistent analysis  
- Emotional bias  
- Missed opportunities  

Vistara AI improves this by:
- Automating analysis  
- Standardizing decisions  
- Providing structured reasoning  

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/PritamCodex/Vistara_Ai.git
cd Vistara_Ai
npm install
npm start
```

🔐 Environment Variables
REACT_APP_FIREBASE_API_KEY=your-key
REACT_APP_RAZORPAY_KEY=your-key
