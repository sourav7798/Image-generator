# Image Generator (Backend)

This project is a Node.js-based backend service for generating images using AI models. It exposes APIs and includes multiple test scripts to validate different model behaviors and integrations.

---

## Overview

The server handles image generation requests and communicates with external AI models. It is designed for experimentation and testing different generation methods before integrating into a frontend or extension.

---

## Tech Stack

* Node.js
* Express.js (assumed from structure)
* External AI APIs (image generation models)
* dotenv for environment configuration

---

## Project Structure

```
server/
│── .env.example          # Example environment variables
│── index.js              # Main server entry point
│── check_models.js       # Script to verify available models
│── test_gen.js           # Image generation testing
│── test_models.js        # Model testing script
│── test_flash.js         # Flash model testing
│── test_pollinations.js  # Pollinations API testing
│── package.json          # Dependencies and scripts
│── package-lock.json     # Lock file
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sourav7798/Image-generator.git
cd Image-generator/server
npm install
```

---

## Environment Setup

Create a `.env` file in the `server` directory using the example:

```
API_KEY=your_api_key_here
PORT=5000
```

---

## Running the Server

```bash
node index.js
```

or (if using nodemon):

```bash
nodemon index.js
```

---

## Testing Scripts

You can run different test files to verify functionality:

```bash
node test_gen.js
node test_models.js
node test_flash.js
node test_pollinations.js
node check_models.js
```

Each script is used to experiment with different APIs or configurations.

---

## API Usage (Example)

Once the server is running, you can send a request:

```
POST /generate
```

Request body:

```json
{
  "prompt": "A futuristic city at sunset"
}
```

Response:

```json
{
  "image_url": "generated_image_link"
}
```

---

## Use Cases

* AI image generation backend
* Testing multiple AI model providers
* Integration with frontend apps or browser extensions

---

## Future Improvements

* Add proper API routes documentation
* Add frontend interface
* Implement rate limiting and validation
* Store generated images


This project is open-source and available under the MIT License.
