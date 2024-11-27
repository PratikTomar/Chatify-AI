# Chatify AI Personal Assistant

**Chatify AI Personal Assistant** is an intelligent chat application powered by AI, designed to assist users with personalized responses, clear communication, and seamless chat experiences. The app integrates modern technologies to deliver a responsive, user-friendly interface and real-time conversational capabilities.

---

## 🚀 Features

- **AI-Powered Responses**: Generate context-aware and intelligent replies.
- **User Authentication**: Secure login and personalized user sessions with http cookies.
- **Chat History Management**: Save, view, and delete chat conversations.
- **Responsive Design**: Optimized for devices of all sizes.
- **Dark Mode Interface**: A sleek and modern UI with dark mode.

---

## 🛠️ Technologies Used

### **Frontend**

- [React.js](https://reactjs.org/) with TypeScript
- [Material-UI (MUI)](https://mui.com/) for UI components
- **Axios** for API calls

### **Backend**

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- **OpenAI API** for AI integration

### **Database**

- [MongoDB](https://www.mongodb.com/) for user data and chat history

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### **Prerequisites**

- Node.js >= 14.x
- MongoDB >= 4.x
- OpenAI API Key

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/PratikTomar/Chatify-AI.git

   ```

2. ```bash
   cd chatify-ai
   ```

3. Run below commands

    ```bash
        npm install
        cd client
        npm install
    ```

### **Environment Variables** ###

Create a .env file in the root and add the following:
```bash
    OPEN_AI_SECRET=your_openai_api_key
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=port_number
    COOKIE_SECRET=your_cookie_secret
    OPEN_AI_ORGANISATION_ID = your_open_ai_organisation_id

```

### **Run the Application** ###

Start the backend server:

```bash
    cd backend
    npm run dev
```

Start the frontend application:

```bash
    cd frontend
    npm run dev
```
