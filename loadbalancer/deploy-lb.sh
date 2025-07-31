#!/bin/bash

DOCKER_USERNAME="anglebert"
LB_NAME="haproxy-loadbalancer"
VERSION="v1"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🐳 Building and Deploying HAProxy Load Balancer to Docker Hub${NC}"

if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building Load Balancer Docker image...${NC}"
docker build -t ${DOCKER_USERNAME}/${LB_NAME}:${VERSION} .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Load Balancer Docker image built successfully!${NC}"

echo -e "${YELLOW}🧪 Testing load balancer locally...${NC}"
docker run -d --name test-${LB_NAME} -p 8081:8080 ${DOCKER_USERNAME}/${LB_NAME}:${VERSION}

sleep 5

echo -e "${YELLOW}🔍 Testing load balancer endpoint...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "403" ]; then
    echo -e "${GREEN}✅ Load balancer test successful! (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ Load balancer test failed! (HTTP $HTTP_CODE)${NC}"
    docker stop test-${LB_NAME}
    docker rm test-${LB_NAME}
    exit 1
fi

docker stop test-${LB_NAME}
docker rm test-${LB_NAME}

echo -e "${YELLOW}🔐 Logging into Docker Hub...${NC}"
docker login

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker Hub login failed!${NC}"
    exit 1
fi

echo -e "${YELLOW}📤 Pushing Load Balancer to Docker Hub...${NC}"
docker push ${DOCKER_USERNAME}/${LB_NAME}:${VERSION}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed Load Balancer to Docker Hub!${NC}"
    echo -e "${GREEN}🎉 Your load balancer image is available at: ${DOCKER_USERNAME}/${LB_NAME}:${VERSION}${NC}"
else
    echo -e "${RED}❌ Failed to push Load Balancer to Docker Hub!${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Load Balancer deployment complete!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "${YELLOW}   1. Deploy this load balancer to Render or your preferred platform${NC}"
echo -e "${YELLOW}   2. Configure it to point to your app instances${NC}"
echo -e "${YELLOW}   3. Test end-to-end load balancing${NC}" 