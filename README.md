# Elysia with buntime

This is a boilerplate, it's not meant to be ready or pretty, just to get new projects quickly started, since you most likely will change a lot of things anyway.
Idea is to have a minimal starting point with somewhat sensible defaults.

This boilerplate doesn't enforce any project structure. Feel free to organize your files as you see fit. Feature based or domain based structures are both good approaches, but can be overwhelming for small projects. Start simple and refactor as needed.

The project uses plugin which converts the routes directory into nextjs like file based routing.

## Getting Started

This project demonstrates how to run an Elysia application using the Bun runtime.

## Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

## Installation

- Clone the repository
- Create .env file and fill the environment variables
- Run "bun install" to install dependencies

## Development

- Use "bun run dev" to start the development server with hot-reloading
- Access the documentation at http://localhost:3000/docs

## Production

- Use "bun run build" to create a production build
- Start the production server with "bun run start"

Or use the provided Dockerfile and docker-compose.yml to containerize the application
