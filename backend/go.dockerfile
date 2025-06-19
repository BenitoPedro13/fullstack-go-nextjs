FROM golang:1.23.2-alpine

WORKDIR /app

COPY . .

# Download dependencies
RUN go get -d -v ./...

# Build the go application
RUN go build -o api .

EXPOSE 3001

CMD ["./api"]