docker stop backend
docker container rm backend
docker build --no-cache -t wine-backend .
docker run -d --name backend -e DATABASE_URL="mysql://wine:i4g5WNxi5KBr8s@hjem.jazper.dk:3306/WINE_DB" -e JWT_SECRET="BUqC1n1xRU2D1iVbWyfLgA==" -p 3000:3000 wine-backend
sleep 1
docker ps
docker container logs backend