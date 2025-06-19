FROM golang:1.23.2-alpine

WORKDIR /app

# Copy go mod and sum files from root
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code from backend directory
COPY backend/ .

# Build the go application
RUN go build -o api .

EXPOSE 3001

CMD ["./api"]