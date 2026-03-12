import { OpenAI } from 'openai';
import { b as createServerRpc, d as createServerFn, p as prompts } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import 'react';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const getClientTokenFn_createServerFn_handler = createServerRpc("src_routes_demo_tsx--getClientTokenFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getClientTokenFn.__executeServer(opts, signal);
});
const getClientTokenFn = createServerFn().handler(getClientTokenFn_createServerFn_handler, async () => {
  const client = new OpenAI();
  const response = await client.realtime.clientSecrets.create({
    session: {
      type: "realtime",
      model: "gpt-realtime",
      audio: {
        output: {
          voice: "cedar"
        }
      },
      instructions: prompts.name,
      tools: [
        // {
        //   type: "mcp",
        //   server_label: "N8N",
        //   server_url: process.env.N8N_MCP_SERVER_URL,
        //   require_approval: "never",
        // },
        {
          type: "mcp",
          server_label: "HomeAssistant",
          server_url: process.env.HOME_ASSISTANT_MCP_ENDPOINT,
          authorization: process.env.HOME_ASSISTANT_TOKEN,
          require_approval: "never"
        }
      ]
    }
  });
  return {
    token: response.value
  };
});

export { getClientTokenFn_createServerFn_handler };
//# sourceMappingURL=demo-Dvt94rN_.mjs.map
