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
- **CORS Support**: Cross-origin resource sharing enabled

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (for containerized deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Anglebert-Dev/Playing-Around-with-APIs-Assignement.git
   cd Play-with-APIs-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm start
   ```

4. **Access the application**
   - **Frontend**: Navigate to `http://localhost:3000`
   - **API Endpoint**: `http://localhost:3000/api/inspire`

**Note**: This is a **full-stack application** where the Express.js backend serves both the API and the frontend static files from the same port.

## 🐳 Docker Deployment

### Why Docker?

Docker containerization provides several advantages:

- **Consistency**: Same environment across development and production
- **Portability**: Run anywhere Docker is installed
- **Isolation**: No conflicts with system dependencies
- **Scalability**: Easy to deploy multiple instances
- **Security**: Non-root user and minimal attack surface

### Complete Load Balancer Setup

This project includes a complete load balancer setup with HAProxy for high availability and scalability.

#### Automated Deployment (Recommended)

We've created deployment scripts to simplify the entire process:

```bash
# Deploy the main application
./deploy.sh

# Deploy the load balancer
cd loadbalancer
./deploy-lb.sh
cd ..
```

**What the scripts do:**

1. ✅ **Builds Docker images** with proper optimization
2. ✅ **Tests locally** to ensure functionality
3. ✅ **Logs into Docker Hub** automatically
4. ✅ **Pushes to Docker Hub** with proper tagging
5. ✅ **Provides clear feedback** at each step

#### Running the Complete Setup

Once deployed, anyone can run the complete load balancer setup:

```bash
# Pull the images
docker pull anglebert/boredom-buster:v1
docker pull anglebert/haproxy-loadbalancer:v1

# Run the complete setup with Docker Compose
docker compose up -d

# Access the application through the load balancer
curl http://localhost:8082
```

#### Manual Deployment

If you prefer manual control:

```bash
# 1. Build the Docker images
docker build -t your-username/boredom-buster:v1 .
cd loadbalancer
docker build -t your-username/haproxy-loadbalancer:v1 .
cd ..

# 2. Test locally
docker run -d --name test-app -p 8080:8080 your-username/boredom-buster:v1
curl http://localhost:8080/api/inspire

# 3. Stop test container
docker stop test-app && docker rm test-app

# 4. Login to Docker Hub
docker login

# 5. Push to Docker Hub
docker push your-username/boredom-buster:v1
docker push your-username/haproxy-loadbalancer:v1
```

### Docker Compose Setup

The project includes a complete Docker Compose configuration for load balancing:

```yaml
services:
  web-01:
    image: anglebert/boredom-buster:v1
    container_name: web-01
    ports:
      - "8080:8080"
    networks:
      - lablan

  web-02:
    image: anglebert/boredom-buster:v1
    container_name: web-02
    ports:
      - "8081:8080"
    networks:
      - lablan

  lb-01:
    build: ./loadbalancer
    container_name: lb-01
    ports:
      - "8082:8082"
    depends_on:
      - web-01
      - web-02
    networks:
      - lablan
```

**To run the complete setup:**

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Test the load balancer
curl http://localhost:8082/api/inspire
```

### Load Balancer Configuration

The HAProxy load balancer is configured with:

- **Round-robin balancing** between web-01 and web-02
- **Health checks** to ensure service availability
- **Port 8082** for external access
- **Automatic failover** if one server goes down

### Testing Load Balancing

To verify that load balancing is working:

```bash
# Make multiple requests to see round-robin in action
for i in {1..5}; do
  echo "Request $i:"
  curl -s http://localhost:8082/api/inspire | jq -r '.activity.activity'
  echo
done
```

You should see different activities from each request, indicating that the load balancer is distributing traffic between the two web servers.

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
├── loadbalancer/
│   ├── Dockerfile             # HAProxy container configuration
│   ├── haproxy.cfg           # Load balancer configuration
│   └── deploy-lb.sh          # Load balancer deployment script
├── Dockerfile                 # Main application container configuration
├── docker-compose.yml         # Complete setup with load balancing
├── deploy.sh                  # Main application deployment script
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

## 🧪 Testing

### **Local Testing**

```bash
# Test the main application
curl http://localhost:3000/api/inspire

# Test with filters
curl "http://localhost:3000/api/inspire?type=recreational&participants=2"
```

### **Docker Testing**

```bash
# Test individual containers
curl http://localhost:8080/api/inspire  # web-01
curl http://localhost:8081/api/inspire  # web-02

# Test load balancer
curl http://localhost:8082/api/inspire  # lb-01
```

### **Load Balancer Testing**

```bash
# Verify round-robin distribution
for i in {1..10}; do
  echo "Request $i:"
  curl -s http://localhost:8082/api/inspire | jq -r '.activity.activity'
  sleep 1
done
```

### **Health Checks**

```bash
# Check container status
docker ps

# Check container logs
docker compose logs web-01
docker compose logs web-02
docker compose logs lb-01

# Check load balancer stats
docker exec lb-01 cat /proc/net/dev
```

## 📋 Assignment Requirements

### **Part One: Local Implementation** ✅ COMPLETE

- ✅ **Web Application**: HTML/CSS/JavaScript frontend
- ✅ **External API Integration**: Bored API, Advice Slip API, ZenQuotes API
- ✅ **Meaningful Purpose**: Boredom Buster - practical value for users
- ✅ **User Interaction**: Sorting, filtering, searching capabilities
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Clean Code**: Well-structured, documented codebase

### **Part Two A: Docker Deployment** ✅ COMPLETE

- ✅ **Containerization**: Dockerfile with proper configuration
- ✅ **Docker Hub**: Images published (`anglebert/boredom-buster:v1`, `anglebert/haproxy-loadbalancer:v1`)
- ✅ **Lab Machine Setup**: Docker Compose with web-01, web-02, lb-01
- ✅ **Load Balancer**: HAProxy configuration with round-robin
- ✅ **End-to-End Testing**: Complete setup working

### **Deployment Instructions**

#### **For Grader/Instructor:**

1. **Clone and Setup:**

   ```bash
   git clone https://github.com/Anglebert-Dev/Playing-Around-with-APIs-Assignement.git
   cd Play-with-APIs-assignment
   ```

2. **Run Complete Setup:**

   ```bash
   docker compose up -d
   ```

3. **Test Load Balancing:**

   ```bash
   # Test individual servers
   curl http://localhost:8080/  # web-01
   curl http://localhost:8081/  # web-02

   # Test load balancer (round-robin)
   curl http://localhost:8082/  # lb-01

   # Verify load balancing
   for i in {1..5}; do
     echo "Request $i:"
     curl -s http://localhost:8082/ | jq -r '.activity.activity'
     echo
   done
   ```

4. **Access Web Interface:**
   - Open browser to `http://localhost:8082`
   - Use the interactive web interface

#### **Docker Images:**

- **Application**: `anglebert/boredom-buster:v1`
- **Load Balancer**: `anglebert/haproxy-loadbalancer:v1`

#### **Ports:**

- **web-01**: `http://localhost:8080`
- **web-02**: `http://localhost:8081`
- **lb-01 (Load Balancer)**: `http://localhost:8082`

## 🎥 Demo Video Script

### **Introduction (30 seconds)**

- Show the web interface at `http://localhost:8082`
- Demonstrate the "Get New Inspiration" button
- Show the three-part response (activity + advice + quote)

### **Features Demo (60 seconds)**

- **Filtering**: Show category and participant filters
- **Copy Functionality**: Demonstrate one-click copying
- **History**: Show the activity history feature
- **Error Handling**: Show graceful error messages

### **Load Balancer Demo (30 seconds)**

- **Terminal**: Show `docker ps` to display running containers
- **Testing**: Run the load balancer test script
- **Round-robin**: Show different activities from multiple requests
- **End-to-end**: Demonstrate complete setup working

### **Technical Highlights (30 seconds)**

- **Docker Hub**: Show published images
- **Docker Compose**: Show the complete setup
- **API Integration**: Mention the three external APIs used
- **Deployment**: Show the deployment scripts

## 🏆 Project Achievements

### **Technical Excellence**

- ✅ **Full-stack Application**: Node.js backend + HTML/CSS/JS frontend
- ✅ **Multiple API Integration**: 3 external APIs with error handling
- ✅ **Docker Containerization**: Optimized images with security best practices
- ✅ **Load Balancing**: HAProxy with round-robin distribution
- ✅ **Automated Deployment**: Scripts for easy deployment

### **User Experience**

- ✅ **Modern UI**: Clean, responsive design
- ✅ **Interactive Features**: Filtering, copying, history
- ✅ **Error Handling**: Graceful fallbacks and user feedback
- ✅ **Accessibility**: Mobile-friendly design

### **DevOps & Deployment**

- ✅ **Docker Hub**: Public images for easy deployment
- ✅ **Docker Compose**: Complete orchestration setup
- ✅ **Load Balancer**: High availability configuration
- ✅ **Documentation**: Comprehensive README with instructions

## 📞 Support

For questions or issues:

- **GitHub Issues**: [Repository Issues](https://github.com/Anglebert-Dev/Playing-Around-with-APIs-Assignement/issues)
- **Email**: a.ishimwe6@alustudent.com
- **Documentation**: This README contains all necessary information

---

**Built with ❤️ by Anglebert Ishimwe for ALU Play with APIs Assignment**

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

### **Docker Features**

- **Multi-stage Build**: Optimized image size
- **Security**: Non-root user execution
- **Health Checks**: Automatic container monitoring
- **Environment Variables**: Configurable settings
- **Port Mapping**: Flexible port configuration

### **API Endpoints**

#### `GET /api/inspire`

Returns a complete inspiration package (activity + advice + quote)

**Query Parameters:**

- `type`: Activity category (education, recreational, social, etc.)
- `participants`: Number of participants (1-8)

**Example:**

```bash
# Local development
curl "http://localhost:3000/api/inspire?type=recreational&participants=2"

# Docker container
curl "http://localhost:8080/api/inspire?type=recreational&participants=2"
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
# Local development
curl "http://localhost:3000/api/inspire/advice/search?q=success"

# Docker container
curl "http://localhost:8080/api/inspire/advice/search?q=success"
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

### **Docker Customization**

- **Port**: Change `EXPOSE 8080` in Dockerfile
- **Environment**: Add variables in docker-compose.yml
- **Dependencies**: Update package.json and rebuild

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

**Docker build fails:**

```bash
# Check Docker is running
docker info

# Clean up and rebuild
docker system prune -f
docker build --no-cache -t your-username/boredom-buster:v1 .
```

**API errors:**

- Check internet connection
- Verify API endpoints are accessible
- Review server logs for detailed error messages

**Frontend not loading:**

- Ensure server is running on port 3000
- Check browser console for CORS errors
- Verify all files are in the `public/` directory

**Docker container issues:**

```bash
# Check container logs
docker logs <container-name>

# Restart container
docker restart <container-name>

# Remove and recreate
docker rm -f <container-name>
docker run -d --name <container-name> -p 8080:8080 your-username/boredom-buster:v1
```

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
- **Docker**: For containerization
- **Modern Web APIs**: For clipboard and storage functionality

---

**Built with ❤️ using modern web technologies**

## ⚠️ Performance Notice

> **Note:**
> This application relies on free, public APIs (Bored API, Advice Slip API, ZenQuotes).
> **Response times may occasionally be slow** (a few seconds) due to network latency, API rate limits, or throttling by the API providers.
> This is normal for public APIs and not a bug in the application.

---
