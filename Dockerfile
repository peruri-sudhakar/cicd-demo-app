FROM nginx:alpine

# Copy all project files into Nginx public folder
COPY . /usr/share/nginx/html

EXPOSE 80
