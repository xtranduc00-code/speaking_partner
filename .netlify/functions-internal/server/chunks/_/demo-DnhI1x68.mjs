import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { RealtimeAgent, tool, RealtimeSession } from '@openai/agents-realtime';
import { u as useServerFn, B as Button, M as MessageItem, a as MessageActionTextarea, c as convertFileToBase64 } from './utils-DTBdiLwI.mjs';
import { PhoneHangUp, PhoneCall01, Phone } from '@untitledui/icons';
import { c as createAudio, s as sounds, g as getClientTokenFn } from './ssr.mjs';
import confetti from 'canvas-confetti';
import { PowerGlitch } from 'powerglitch';
import '@tanstack/react-router';
import '@untitledui/file-icons';
import 'react-aria-components';
import 'tailwind-merge';
import 'openai';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const confettiTool = tool({
  name: "Fire confetti",
  description: "Execute this function to show confetti on the user's screen",
  parameters: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: true
  },
  strict: false,
  needsApproval: async () => false,
  execute: async () => {
    await confetti({
      origin: {
        x: 0.5,
        y: 0.9
      },
      spread: 70,
      startVelocity: 90,
      particleCount: 250
    });
  }
});
const glitchTool = tool({
  name: "Glitch",
  description: "Glitch the user's screen. You must do this every time you get angry.",
  parameters: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: true
  },
  strict: false,
  needsApproval: async () => false,
  execute: async () => {
    PowerGlitch.glitch(document.body, {
      playMode: "always"
    });
  }
});
function Home() {
  const getClientToken = useServerFn(getClientTokenFn);
  const [loading, setLoading] = useState(false);
  const [, setAgent] = useState(null);
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState([]);
  return /* @__PURE__ */ jsx("div", { className: "p-2 min-h-screen pb-24 flex items-center justify-center w-full bg-bg-primary dark:bg-brand-950", children: /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border border-border-brand/30 dark:border-border-brand/50 mx-auto max-w-full w-xl bg-white dark:bg-bg-secondary shadow-2xl shadow-brand-600/10 dark:shadow-brand-600/20", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex justify-between flex-col rounded-lg p-8 items-center gap-4 bg-brand-50 dark:bg-brand-950", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-brand-800 dark:text-text-primary z-10", children: "Who you gonna call?" }),
      session && !loading ? /* @__PURE__ */ jsx(Button, { color: "primary-destructive", className: "z-10", size: "lg", onClick: () => {
        session.close();
        setSession(null);
        setAgent(null);
      }, iconLeading: /* @__PURE__ */ jsx(PhoneHangUp, { "data-icon": true }), children: "End Call" }) : /* @__PURE__ */ jsx(Button, { isDisabled: loading, size: "lg", className: "z-10", onClick: async () => {
        const audio = createAudio(sounds.dialing, {
          });
        audio.play();
        setLoading(true);
        const {
          token
        } = await getClientToken();
        const agent = new RealtimeAgent({
          name: "Agent",
          tools: [confettiTool, glitchTool]
        });
        setAgent(agent);
        const session2 = new RealtimeSession(agent);
        session2.on("error", (event) => {
          console.warn("gpt-realtime error", event);
        });
        session2.on("mcp_tool_call_completed", (event) => {
          console.log("mcp_tool_call_completed", event);
        });
        session2.on("history_updated", (event) => {
          setHistory(event);
        });
        setSession(session2);
        await session2.connect({
          apiKey: token
        });
        setLoading(false);
        createAudio(sounds.connected, {
          }).play();
        audio.stop();
      }, iconLeading: loading ? /* @__PURE__ */ jsx(PhoneCall01, { "data-icon": true }) : /* @__PURE__ */ jsx(Phone, { "data-icon": true }), children: loading ? "Calling..." : "Start Call" })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "flex h-full flex-col gap-4 overflow-y-auto px-4 py-6 md:px-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary", children: history.map((item) => {
      if (item.type === "message") {
        return /* @__PURE__ */ jsx(MessageItem, { msg: {
          id: item.itemId,
          status: item.role === "user" ? "read" : void 0,
          text: item.content.map((c) => c.type === "input_text" || c.type === "output_text" ? c.text : c.type === "input_audio" || c.type === "output_audio" ? c.transcript : null).filter(Boolean).join("\n"),
          user: {
            me: item.role === "user",
            name: item.role === "user" ? "You" : "Agent",
            status: !!session ? "online" : void 0
          }
        } }, item.itemId);
      } else {
        return /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gray-100 text-xs p-2 overflow-x-scroll", children: /* @__PURE__ */ jsx("pre", { children: JSON.stringify(item, null, 2) }) }, item.itemId);
      }
    }) }),
    session && /* @__PURE__ */ jsx(MessageActionTextarea, { onSubmit: async (message, file) => {
      const input = {
        role: "user",
        type: "message",
        content: []
      };
      if (message.trim()) {
        input.content.push({
          type: "input_text",
          text: message
        });
      }
      if (file) {
        if (file.type.startsWith("image/")) {
          input.content.push({
            type: "input_image",
            image: await convertFileToBase64(file)
          });
        } else if (file.type.startsWith("text/") || file.type === "application/json" || /\.(txt|csv|md|json)$/i.test(file.name)) {
          input.content.push({
            type: "input_text",
            text: `Here is my vocabulary or notes:

${await file.text()}`
          });
        }
      }
      session.sendMessage(input);
    } })
  ] }) });
}

export { Home as component };
//# sourceMappingURL=demo-DnhI1x68.mjs.map
