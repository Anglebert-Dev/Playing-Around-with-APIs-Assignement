#!/bin/bash

# Configuration
DOCKER_USERNAME="anglebert"
APP_NAME="boredom-buster"
VERSION="v1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🐳 Building and Deploying Boredom Buster to Docker Hub${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Build the Docker image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t ${DOCKER_USERNAME}/${APP_NAME}:${VERSION} .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker image built successfully!${NC}"

# Test locally
echo -e "${YELLOW}🧪 Testing locally...${NC}"
docker run -d --name test-${APP_NAME} -p 8080:8080 ${DOCKER_USERNAME}/${APP_NAME}:${VERSION}

# Wait for container to start
sleep 5

# Test the API
echo -e "${YELLOW}🔍 Testing API endpoint...${NC}"
if curl -f http://localhost:8080/api/inspire > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API test successful!${NC}"
else
    echo -e "${RED}❌ API test failed!${NC}"
    docker stop test-${APP_NAME}
    docker rm test-${APP_NAME}
    exit 1
fi

# Stop and remove test container
docker stop test-${APP_NAME}
docker rm test-${APP_NAME}

# Login to Docker Hub
echo -e "${YELLOW}🔐 Logging into Docker Hub...${NC}"
docker login

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker Hub login failed!${NC}"
    exit 1
fi

# Push to Docker Hub
echo -e "${YELLOW}📤 Pushing to Docker Hub...${NC}"
docker push ${DOCKER_USERNAME}/${APP_NAME}:${VERSION}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to Docker Hub!${NC}"
    echo -e "${GREEN}🎉 Your image is available at: ${DOCKER_USERNAME}/${APP_NAME}:${VERSION}${NC}"
else
    echo -e "${RED}❌ Failed to push to Docker Hub!${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Deployment complete!${NC}"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "   1. Update DOCKER_USERNAME in this script"
echo -e "   2. Deploy to your lab machines (web-01, web-02)"
echo -e "   3. Configure load balancer (lb-01)" 