# Base image
FROM alpine

# Download and install all dependencies
RUN apk add --update redis

# Default command on start (main process)
CMD ["redis-server"]
