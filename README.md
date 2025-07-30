# 🎯 Boredom Buster - Find Your Next Adventure

A modern web application that helps you discover exciting activities and get inspired with wise advice and motivational quotes when you're feeling bored or stuck.

## ✨ Features

### 🎮 **Activity Discovery**

- **Random Activities**: Get personalized activity suggestions from the Bored API
- **Smart Filtering**: Filter by category (education, recreational, social, DIY, charity, cooking, relaxation, music, busywork)
- **Participant Count**: Specify how many people can join (1-8 participants)
- **Activity Details**: View type, participants, duration, and other metadata

### 💡 **Inspiration Package**

- **Wise Advice**: Get thoughtful advice from the Advice Slip API
- **Motivational Quotes**: Receive inspiring quotes from ZenQuotes API
- **Complete Package**: Each request gives you an activity, advice, AND a quote

### 🎨 **User Experience**

- **Modern UI**: Clean, responsive design that works on all devices
- **Copy Functionality**: One-click copy for activities, advice, and quotes
- **Activity History**: Track your recent discoveries with timestamps
- **Error Handling**: Graceful error messages and fallbacks
- **Loading States**: Clear feedback during API requests

### 🔧 **Technical Features**

- **Modular Backend**: Well-structured Node.js/Express architecture
- **API Integration**: Multiple external APIs with error handling
- **Local Storage**: Persistent history without database setup
- **Rate Limiting**: Built-in protection against abuse
- **CORS Support**: Cross-origin request handling

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Play-with-APIs-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Play-with-APIs-assignment/
├── server/
│   ├── app.js                 # Main server file
│   ├── routes/
│   │   └── inspire.routes.js  # API route definitions
│   ├── controllers/
│   │   └── inspire.controller.js  # Request handling logic
│   └── services/
│       └── inspire.service.js     # External API integration
├── public/
│   ├── index.html             # Main frontend page
│   ├── styles.css             # Styling
│   └── script.js              # Frontend JavaScript
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🔌 APIs Used

### **Bored API** (Activity Suggestions)

- **Endpoint**: `https://bored-api.appbrewery.com/`
- **Features**: Random activities, filtering by type/participants
- **No API Key Required**

### **Advice Slip API** (Wise Advice)

- **Endpoint**: `https://api.adviceslip.com/`
- **Features**: Random advice, search functionality
- **No API Key Required**

### **ZenQuotes API** (Motivational Quotes)

- **Endpoint**: `https://zenquotes.io/api/`
- **Features**: Random inspirational quotes
- **No API Key Required**

## 🎯 Usage

### **Getting Started**

1. Open the app in your browser
2. Click "Get New Inspiration" for a random activity
3. Use filters to customize your search
4. Copy activities, advice, or quotes to share

### **Filtering Activities**

- **Category**: Select from 9 different activity types
- **Participants**: Specify how many people can join (1-8)
- **Combined Filters**: Use both filters for precise results

### **History Management**

- **Automatic Saving**: All activities are saved to local storage
- **Recent 10 Items**: Keep track of your latest discoveries
- **Timestamps**: See when you discovered each activity
- **Persistent**: History survives browser restarts

## 🛠️ Development

### **Backend Architecture**

- **Express.js**: Web framework for Node.js
- **Modular Design**: Routes → Controllers → Services
- **Error Handling**: Comprehensive error management
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Cross-origin resource sharing enabled

### **Frontend Features**

- **Vanilla JavaScript**: No framework dependencies
- **Responsive Design**: Mobile-first approach
- **Local Storage**: Client-side data persistence
- **Copy API**: Modern clipboard functionality

### **API Endpoints**

#### `GET /api/inspire`

Returns a complete inspiration package (activity + advice + quote)

**Query Parameters:**

- `type`: Activity category (education, recreational, social, etc.)
- `participants`: Number of participants (1-8)

**Example:**

```bash
curl "http://localhost:3000/api/inspire?type=recreational&participants=2"
```

**Response:**

```json
{
  "activity": {
    "activity": "Go for a hike",
    "type": "recreational",
    "participants": 2,
    "price": 0,
    "accessibility": "Easy"
  },
  "advice": "Take time to appreciate the little things.",
  "quote": {
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
  }
}
```

#### `GET /api/inspire/advice/search?q=keyword`

Search for advice by keyword

**Example:**

```bash
curl "http://localhost:3000/api/inspire/advice/search?q=success"
```

## 🎨 Customization

### **Adding New APIs**

1. Add API logic in `server/services/inspire.service.js`
2. Update the controller in `server/controllers/inspire.controller.js`
3. Add routes in `server/routes/inspire.routes.js`
4. Update frontend to display new data

### **Styling Changes**

- Modify `public/styles.css` for visual updates
- Responsive breakpoints at 768px
- Color scheme: Blues and grays with accent colors

### **Feature Extensions**

- **User Accounts**: Add authentication system
- **Favorites**: Save preferred activities
- **Social Sharing**: Share activities on social media
- **Notifications**: Remind users to try activities
- **Gamification**: Points for completing activities

## 🐛 Troubleshooting

### **Common Issues**

**Server won't start:**

```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill process if needed
kill -9 <PID>
```

**API errors:**

- Check internet connection
- Verify API endpoints are accessible
- Review server logs for detailed error messages

**Frontend not loading:**

- Ensure server is running on port 3000
- Check browser console for CORS errors
- Verify all files are in the `public/` directory

### **Debug Mode**

Enable detailed logging by setting environment variables:

```bash
DEBUG=* npm start
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Bored API**: For activity suggestions
- **Advice Slip API**: For wise advice
- **ZenQuotes API**: For motivational quotes
- **Express.js**: For the web framework
- **Modern Web APIs**: For clipboard and storage functionality

---

**Built with ❤️ using modern web technologies**
