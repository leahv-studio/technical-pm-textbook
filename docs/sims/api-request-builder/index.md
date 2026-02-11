# API Request Builder

An interactive simulation that demonstrates the REST API request and response cycle. Select an HTTP method, choose an endpoint, and send a request to see how clients and servers communicate.

<iframe src="./main.html" width="100%" height="850px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim helps you understand the core components of an API call:

- **HTTP Methods** - GET (read), POST (create), PUT (update), DELETE (remove)
- **Endpoints** - The URL path that identifies the resource you want to interact with
- **Request Headers** - Metadata sent with the request, like authentication tokens
- **Request Body** - Data sent with POST and PUT requests (not used with GET and DELETE)
- **Status Codes** - The server's response indicating success or failure
- **Response Body** - The data returned by the server, typically in JSON format

## How to Use

1. **Select a method** by clicking one of the colored buttons (GET, POST, PUT, DELETE)
2. **Choose an endpoint** from the dropdown (/users, /orders, /products)
3. **Click Send Request** to watch the animated request/response cycle
4. **Read the response** including the status code, response body, and explanation

Try different combinations to discover various status codes. Not every request succeeds - some return errors like 400 Bad Request, 401 Unauthorized, 404 Not Found, or 500 Server Error.

## Learning Objectives

After exploring this simulation, you should be able to:

- Identify the four main HTTP methods and when each is used
- Read and interpret common HTTP status codes
- Understand why POST and PUT requests include a body but GET and DELETE typically do not
- Explain the difference between client errors (4xx) and server errors (5xx)

## Related Content

This simulation supports [Chapter 6: APIs and Integrations](../../chapters/06-apis-and-integrations/index.md), which covers REST APIs, authentication, webhooks, and integration patterns for technical product managers.
