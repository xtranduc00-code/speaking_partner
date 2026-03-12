import OpenAI$1 from 'openai';
import { b as createServerRpc, d as createServerFn } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import 'react';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const getApiKeyFn_createServerFn_handler = createServerRpc("src_routes_index_tsx--getApiKeyFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getApiKeyFn.__executeServer(opts, signal);
});
const getApiKeyFn = createServerFn().handler(getApiKeyFn_createServerFn_handler, async () => {
  const client = new OpenAI$1();
  const tools = process.env.HOME_ASSISTANT_MCP_ENDPOINT && process.env.HOME_ASSISTANT_TOKEN ? [{
    type: "mcp",
    server_label: "HomeAssistant",
    server_url: process.env.HOME_ASSISTANT_MCP_ENDPOINT,
    authorization: process.env.HOME_ASSISTANT_TOKEN,
    require_approval: "never"
  }] : [];
  const response = await client.realtime.clientSecrets.create({
    session: {
      type: "realtime",
      model: "gpt-realtime",
      audio: {
        output: {
          voice: "cedar"
        }
      },
      instructions: "You are an angry assistant.",
      tools
    }
  });
  return {
    apiKey: response.value
  };
});

export { getApiKeyFn_createServerFn_handler };
//# sourceMappingURL=index-C9zRmyQJ.mjs.map
