# Go parameters
GOCMD = go
GOBUILD = $(GOCMD) build
GOCLEAN = $(GOCMD) clean
GOTEST = $(GOCMD) test
GOGET = $(GOCMD) get

# Binary names
BINARY_NAME = backendApp

all: run
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)

run:
	$(GOBUILD) -o $(BINARY_NAME) src/main.go
	./$(BINARY_NAME)

deps:
	$(GOGET) github.com/gin-gonic/gin
	$(GOGET) github.com/etcd-io/bbolt

.PHONY: all build test clean run deps
