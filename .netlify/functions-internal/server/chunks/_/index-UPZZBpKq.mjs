import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { u as useServerFn, B as Button, M as MessageItem, a as MessageActionTextarea, c as convertFileToBase64 } from './utils-DTBdiLwI.mjs';
import { PhoneHangUp, PhoneCall01, Phone } from '@untitledui/icons';
import { c as createAudio, s as sounds, a as getApiKeyFn } from './ssr.mjs';
import { RealtimeAgent, tool, RealtimeSession } from '@openai/agents-realtime';
import '@tanstack/react-router';
import '@untitledui/file-icons';
import 'react-aria-components';
import 'tailwind-merge';
import 'openai';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const FRIEND_TONE = `
You're like a supportive friend who's really good at English \u2014 warm, natural, and easy to talk to. Use "you" and "we", contractions (I'm, you're, that's), and a conversational tone. React to what they say (e.g. "Oh nice!", "Yeah that makes sense") instead of sounding like a textbook. Keep it in English only. Don't list rules unless they ask; just chat and help.
`;
const LEARNING_MODES = [{
  id: "casual",
  label: "Casual chat",
  description: "Relaxed conversation to build confidence.",
  buildInstructions: ({
    level,
    goal
  }) => `
${FRIEND_TONE}

You're chatting in English with a friend who's around ${level} level and wants to work on ${goal}. Keep replies short (2\u20134 sentences), ask follow-up questions so it feels like a real conversation, and if you notice a small mistake, weave the correction in naturally instead of making a big deal of it.
`
}, {
  id: "correction",
  label: "Error correction",
  description: "Focus on fixing grammar and word choice.",
  buildInstructions: ({
    level,
    goal
  }) => `
${FRIEND_TONE}

Your friend (around ${level}, goal: ${goal}) wants you to gently correct their English. First respond to what they said like a normal friend, then give a corrected version and a quick note on what to remember \u2014 keep it to 1\u20132 points so it doesn't feel like a lecture.
`
}, {
  id: "exam",
  label: "Exam practice (IELTS style)",
  description: "Interview-style questions with feedback.",
  buildInstructions: ({
    level,
    goal
  }) => `
${FRIEND_TONE}

You're helping a friend practice IELTS-style speaking (around ${level}, goal: ${goal}). Ask one question at a time like in a real interview, listen to their answer, then give short, encouraging feedback (vocab, fluency, grammar). Sound like a supportive buddy, not a stiff examiner.
`
}, {
  id: "roleplay",
  label: "Role-play: restaurant",
  description: "Practice ordering food in a restaurant.",
  buildInstructions: ({
    level,
    goal
  }) => `
${FRIEND_TONE}

You're a friendly waiter and your friend is the customer (they're around ${level}, working on ${goal}). Stay in character, guide them through ordering, and if they're stuck, throw in an example phrase. Only correct mistakes when it really matters so the role-play stays fun.
`
}, {
  id: "writing",
  label: "Writing (theory + practice)",
  description: "Teach structure, formulas, and step-by-step writing.",
  buildInstructions: ({
    level,
    goal
  }) => `
${FRIEND_TONE}

You're helping a friend with writing (level ${level}, focus ${goal}). They might have a theory file or notes open \u2014 use what they share. Explain structure and formulas (e.g. PEEL, linking words) in a simple, friendly way; give one step at a time and suggest better phrasing when you spot it. Keep it clear but not lecture-y.
`
}];
function Home() {
  var _a2;
  var _a;
  const getApiKey = useServerFn(getApiKeyFn);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState([]);
  const [savedSessions, setSavedSessions] = useState([]);
  const [modeId, setModeId] = useState("casual");
  const [level, setLevel] = useState("band_5_6");
  const [goal, setGoal] = useState("fluency");
  const [speakingSpeed, setSpeakingSpeed] = useState("normal");
  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    return;
  }, []);
  useEffect(() => {
    return;
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "p-2 min-h-screen pb-24 flex items-center justify-center w-full bg-bg-primary dark:bg-brand-950", children: /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border border-border-brand/30 dark:border-border-brand/50 mx-auto max-w-full w-xl bg-white dark:bg-bg-secondary shadow-2xl shadow-brand-600/10 dark:shadow-brand-600/20", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex justify-between flex-col rounded-lg p-8 items-center gap-4 bg-brand-50 dark:bg-brand-950", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-brand-800 dark:text-text-primary z-10", children: "English Realtime Tutor" }),
      /* @__PURE__ */ jsxs("div", { className: "z-10 grid w-full gap-3 text-xs text-fg-secondary dark:text-fg-primary md:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[11px] uppercase tracking-wide", children: "Mode" }),
          /* @__PURE__ */ jsx("select", { className: "rounded-md border border-border-brand/40 bg-white px-2 py-1 text-xs dark:bg-bg-secondary", value: modeId, onChange: (e) => setModeId(e.target.value), children: LEARNING_MODES.map((mode) => /* @__PURE__ */ jsx("option", { value: mode.id, children: mode.label }, mode.id)) })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[11px] uppercase tracking-wide", children: "Level (IELTS)" }),
          /* @__PURE__ */ jsxs("select", { className: "rounded-md border border-border-brand/40 bg-white px-2 py-1 text-xs dark:bg-bg-secondary", value: level, onChange: (e) => setLevel(e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "band_4_5", children: "Band 4.0 \u2013 5.0" }),
            /* @__PURE__ */ jsx("option", { value: "band_5_6", children: "Band 5.5 \u2013 6.5" }),
            /* @__PURE__ */ jsx("option", { value: "band_7_plus", children: "Band 7.0+" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[11px] uppercase tracking-wide", children: "Goal" }),
          /* @__PURE__ */ jsxs("select", { className: "rounded-md border border-border-brand/40 bg-white px-2 py-1 text-xs dark:bg-bg-secondary", value: goal, onChange: (e) => setGoal(e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "fluency", children: "Fluency" }),
            /* @__PURE__ */ jsx("option", { value: "vocabulary", children: "Vocabulary" }),
            /* @__PURE__ */ jsx("option", { value: "pronunciation", children: "Pronunciation" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[11px] uppercase tracking-wide", children: "Speaking speed" }),
          /* @__PURE__ */ jsxs("select", { className: "rounded-md border border-border-brand/40 bg-white px-2 py-1 text-xs dark:bg-bg-secondary", value: speakingSpeed, onChange: (e) => setSpeakingSpeed(e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "slow", children: "Slow" }),
            /* @__PURE__ */ jsx("option", { value: "normal", children: "Normal" }),
            /* @__PURE__ */ jsx("option", { value: "fast", children: "Fast" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "z-10 mt-1 text-xs text-fg-secondary dark:text-fg-primary/80 text-center", children: (_a2 = (_a = LEARNING_MODES.find((m) => m.id === modeId)) == null ? void 0 : _a.description) != null ? _a2 : LEARNING_MODES[0].description }),
      showOnboarding && /* @__PURE__ */ jsx("div", { className: "z-10 mt-2 w-full rounded-md border border-border-brand/30 bg-white/80 p-3 text-xs text-fg-secondary shadow-sm dark:bg-bg-secondary/80", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-text-primary dark:text-text-primary", children: "Quick start" }),
          /* @__PURE__ */ jsxs("ol", { className: "mt-1 list-decimal space-y-0.5 pl-4", children: [
            /* @__PURE__ */ jsx("li", { children: "Choose mode, IELTS band, and goal." }),
            /* @__PURE__ */ jsx("li", { children: "Press \u201CStart Call\u201D and speak or type." }),
            /* @__PURE__ */ jsx("li", { children: "Review past sessions below and use buttons on messages for corrections." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "text-xs text-fg-quaternary hover:text-fg-quaternary_hover", onClick: () => {
          setShowOnboarding(false);
        }, children: "Dismiss" })
      ] }) }),
      session && !loading ? /* @__PURE__ */ jsx(Button, { color: "primary-destructive", className: "z-10 dark:bg-error-solid dark:text-white dark:hover:bg-error-solid_hover dark:shadow-xs-skeumorphic dark:ring-1 dark:ring-transparent dark:ring-inset dark:before:absolute dark:before:inset-px dark:before:border dark:before:border-white/12 dark:before:mask-b-from-0%", size: "lg", onClick: () => {
        session.close();
        setSession(null);
      }, iconLeading: /* @__PURE__ */ jsx(PhoneHangUp, { "data-icon": true }), children: "End Call" }) : /* @__PURE__ */ jsx(Button, { isDisabled: loading, size: "lg", className: "z-10 dark:bg-brand-solid dark:text-white dark:hover:bg-brand-solid_hover dark:shadow-xs-skeumorphic dark:ring-1 dark:ring-transparent dark:ring-inset dark:before:absolute dark:before:inset-px dark:before:border dark:before:border-white/12 dark:before:mask-b-from-0%", onClick: async () => {
        var _a3;
        const audio = createAudio(sounds.dialing, {
          });
        const sessionId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
        const startedAt = (/* @__PURE__ */ new Date()).toISOString();
        setSavedSessions((prev) => {
          const next = [...prev, {
            id: sessionId,
            startedAt,
            messages: []
          }];
          return next;
        });
        audio.play();
        setLoading(true);
        const selectedMode = (_a3 = LEARNING_MODES.find((m) => m.id === modeId)) != null ? _a3 : LEARNING_MODES[0];
        const baseInstructions = selectedMode.buildInstructions({
          level,
          goal
        });
        const instructions = `${baseInstructions}
Speaking speed: ${speakingSpeed}.`;
        const agent = new RealtimeAgent({
          name: "Agent",
          instructions,
          tools: [tool({
            name: "Test Tool",
            description: "This is a test tool. Use this at the start of a conversation to test the tool.",
            execute: async () => {
              console.log("Test Tool executed");
            },
            parameters: {
              type: "object",
              properties: {},
              required: [],
              additionalProperties: true
            },
            strict: false
          })]
        });
        const session2 = new RealtimeSession(agent);
        setSession(session2);
        session2.on("history_updated", (event) => {
          setHistory(event);
          const messages = event.filter((item) => item.type === "message").map((item) => {
            const text = item.content.map((c) => {
              if (c.type === "input_audio" || c.type === "output_audio") {
                return c.transcript;
              }
              if (c.type === "input_text" || c.type === "output_text") {
                return c.text;
              }
              return "";
            }).filter(Boolean).join("\n");
            return {
              id: item.itemId,
              text,
              me: item.role === "user",
              name: item.role === "user" ? "You" : "Agent"
            };
          });
          setSavedSessions((prev) => {
            const next = [...prev];
            const idx = next.findIndex((s) => s.id === sessionId);
            if (idx === -1) return prev;
            next[idx] = {
              ...next[idx],
              messages
            };
            return next;
          });
        });
        await session2.connect({
          apiKey: (await getApiKey()).apiKey
        });
        setLoading(false);
        createAudio(sounds.connected, {
          }).play();
        audio.stop();
      }, iconLeading: loading ? /* @__PURE__ */ jsx(PhoneCall01, { "data-icon": true }) : /* @__PURE__ */ jsx(Phone, { "data-icon": true }), children: loading ? "Calling..." : "Start Call" })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "flex h-full flex-col gap-4 overflow-y-auto px-4 py-6 md:px-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary dark:[&::-webkit-scrollbar-track]:bg-bg-primary", children: session == null ? void 0 : session.history.map((item) => {
      if (item.type === "message") {
        const text = item.content.map((c) => {
          if (c.type === "input_audio" || c.type === "output_audio") {
            return c.transcript;
          }
          if (c.type === "input_text" || c.type === "output_text") {
            return c.text;
          }
          return "";
        }).filter(Boolean).join("\n");
        return /* @__PURE__ */ jsx(MessageItem, { msg: {
          id: item.itemId,
          text,
          user: {
            me: item.role === "user",
            name: item.role === "user" ? "You" : "Agent"
          }
        }, onCorrect: item.role === "user" && session ? () => {
          session.sendMessage({
            role: "user",
            type: "message",
            content: [{
              type: "input_text",
              text: `Please correct my sentence and explain briefly: "${text}".`
            }]
          });
        } : void 0, onSimplify: item.role !== "user" && session ? () => {
          session.sendMessage({
            role: "user",
            type: "message",
            content: [{
              type: "input_text",
              text: `Please rewrite your last answer in simpler English suitable for a learner around ${level} IELTS speaking band.`
            }]
          });
        } : void 0 }, item.itemId);
      } else {
        return /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gray-100 dark:bg-bg-tertiary text-xs p-2 overflow-x-scroll text-fg-primary dark:text-fg-primary", children: /* @__PURE__ */ jsx("pre", { children: JSON.stringify(item, null, 2) }) }, item.itemId);
      }
    }) }),
    session && session.history.length > 0 && /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => {
      if (!session) return;
      session.sendMessage({
        role: "user",
        type: "message",
        content: [{
          type: "input_text",
          text: `Before we finish, please give me a brief end-of-session summary: 1) 3 main topics we discussed, 2) 3\u20135 common mistakes I made, 3) what I should practice next time. Keep it under 6 sentences.`
        }]
      });
    }, children: "Summarize this session" }) }),
    savedSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-border-brand/20 pt-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium mb-2 text-text-primary dark:text-text-primary", children: "Past sessions" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 max-h-60 overflow-y-auto text-xs", children: [...savedSessions].slice().reverse().map((savedSession) => /* @__PURE__ */ jsxs("details", { className: "rounded-lg bg-gray-50 dark:bg-bg-tertiary p-2", children: [
        /* @__PURE__ */ jsxs("summary", { className: "cursor-pointer text-fg-secondary dark:text-fg-primary", children: [
          new Date(savedSession.startedAt).toLocaleString(),
          " \xB7",
          " ",
          savedSession.messages.length,
          " messages"
        ] }),
        savedSession.messages.length > 0 && /* @__PURE__ */ jsx("ol", { className: "mt-2 flex flex-col gap-2", children: savedSession.messages.map((msg) => /* @__PURE__ */ jsx(MessageItem, { msg: {
          id: msg.id,
          text: msg.text,
          user: {
            me: msg.me,
            name: msg.name
          }
        } }, msg.id)) })
      ] }, savedSession.id)) })
    ] }),
    /* @__PURE__ */ jsx(MessageActionTextarea, { onSubmit: async (message, file) => {
      if (!session) return;
      if (message.trim()) {
        session.sendMessage({
          role: "user",
          type: "message",
          content: [{
            type: "input_text",
            text: message
          }]
        });
      }
      if (file) {
        if (file.type.startsWith("image/")) {
          session.sendMessage({
            role: "user",
            type: "message",
            content: [{
              type: "input_image",
              image: await convertFileToBase64(file)
            }]
          });
        } else if (file.type.startsWith("text/") || file.type === "application/json" || /\.(txt|csv|md|json)$/i.test(file.name)) {
          const text = await file.text();
          session.sendMessage({
            role: "user",
            type: "message",
            content: [{
              type: "input_text",
              text: `Here is my vocabulary or notes:

${text}`
            }]
          });
        }
      }
    } })
  ] }) });
}

export { Home as component };
//# sourceMappingURL=index-UPZZBpKq.mjs.map
