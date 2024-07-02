# Chatbot :D

Simple React client to our [OpenAI proxy](https://github.com/WebDev-WBSCodingSchool/openai-proxy)

## Installation

- Clone this project

```bash
git clone https://github.com/WebDev-WBSCodingSchool/open-ai-chatbot
```

- Move into the directory

```bash
cd open-ai-chatbot
```

- Install dependencies:

```bash
npm install
```

- Create `.env.development` file at the root of the project with:

  - A variable `VITE_OPENAI_PROXY` with the value of the host where your local proxy is running, it defaults to `http:localhost:5050`
  - A variable `VITE_OPENAI_PROXY_MODE` with the value of the mode you want to use the proxy in, set it to `development` initially

- Run

```bash
npm run dev
```

:warning: Since this project sends the requests to a local proxy, you need to have it running!
