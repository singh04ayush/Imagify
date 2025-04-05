<div align="center">

<img src="./frontend/src/assets/logo.png" alt="Imagify Logo" width="180"/>

# ✨ Imagify - Transform Your Ideas Into Images ✨

> 🎨 AI-Powered Text-to-Image Generation

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=20232A)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=20232A)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.16.1-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=20232A)](https://nodejs.org/)

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a>
</p>

[![GitHub stars](https://img.shields.io/github/stars/singh04ayush/Imagify?style=social)](https://github.com/singh04ayush/Imagify/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/singh04ayush/Imagify?style=social)](https://github.com/singh04ayush/Imagify/network/members)
[![GitHub issues](https://img.shields.io/github/issues/singh04ayush/Imagify?style=social)](https://github.com/singh04ayush/Imagify/issues)

---

</div>

## ✨ Features

<div align="center">

| 🖌️ Text-to-Image | 🔐 User Features | 💾 Management |
|------------------|-----------------|---------------|
| AI Generation    | Authentication  | Image History |
| Prompt Interface | User Profiles   | Downloads     |
| Style Selection  | Secure Storage  | Viewing       |
| High Resolution  | JWT Security    | Deletion      |

</div>

- 🎯 **DALL·E Integration**: Generate images using OpenAI's powerful DALL·E model
- 🚀 **Fast Processing**: Optimized image generation and delivery
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop
- 🔒 **Secure Authentication**: Keep your creations private and accessible
- 🌈 **Style Options**: Choose from various artistic styles
- 💡 **Intuitive Interface**: Simple, user-friendly design
- 🎨 **High-Quality Output**: Create professional-looking images
- 🔄 **Image Management**: Access and manage your image history

## 🚀 Quick Start

<div align="left">

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)
- OpenAI API key

</div>

### 1. Clone the Repository
```bash
git clone https://github.com/singh04ayush/Imagify.git
cd Imagify
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGODB_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# OPENAI_API_KEY=your_openai_api_key

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

<div align="center">

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production server (backend) |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `MONGODB_URL` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT secret key | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |

</div>

## 💻 Usage Guide

<div align="center">

| Step | Action | Description |
|------|--------|-------------|
| 1️⃣ | Register/Login | Create an account or sign in |
| 2️⃣ | Enter Prompt | Describe the image you want |
| 3️⃣ | Generate | Click generate to create your image |
| 4️⃣ | Download | Save your creation to your device |

</div>

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.15.0-CA4245?style=flat-square&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.16.1-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.0-000000?style=flat-square&logo=json-web-tokens&logoColor=white)

</div>

## 🤝 Contributing

<div align="center">

We welcome contributions! Here's how you can help:

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

</div>

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

</div>

## 🙏 Acknowledgments

<div align="center">

| Resource | Description |
|----------|-------------|
| [OpenAI](https://openai.com/) | DALL·E API provider |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [React Community](https://reactjs.org/community) | Amazing React ecosystem |

</div>

---

<div align="center">

### Contributed with ❤️ by [Ayush Singh](https://github.com/singh04ayush)

[![GitHub Follow](https://img.shields.io/github/followers/singh04ayush?style=social)](https://github.com/singh04ayush)

</div>