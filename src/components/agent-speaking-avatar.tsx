import { cx } from "@/utils/cx";

type AgentSpeakingAvatarProps = {
  isSpeaking: boolean;
  isCallActive?: boolean;
  className?: string;
  imageSrc?: string;
};

export function AgentSpeakingAvatar({
  isSpeaking,
  isCallActive = false,
  className,
  imageSrc = "https://randomuser.me/api/portraits/men/32.jpg",
}: AgentSpeakingAvatarProps) {
  return (
    <div className={cx("relative flex items-center justify-center", className)}>
      <div
        className={cx(
          "absolute rounded-full transition-all duration-300",
          isSpeaking
            ? "h-[6.8rem] w-[6.8rem] bg-brand-500/20 blur-[2px]"
            : isCallActive
              ? "h-[6rem] w-[6rem] bg-brand-500/10 blur-[1px] animate-[callPulse_1.2s_ease-in-out_infinite]"
              : "h-24 w-24 bg-brand-500/5",
        )}
      />

      <div
        className={cx(
          "absolute rounded-full border transition-all duration-300",
          isSpeaking
            ? "h-[6.15rem] w-[6.15rem] border-brand-300/50 animate-pulse"
            : isCallActive
              ? "h-[5.95rem] w-[5.95rem] border-brand-300/25 animate-[callPulse_1.2s_ease-in-out_infinite]"
              : "h-[5.9rem] w-[5.9rem] border-white/20",
        )}
      />

      <div className="relative h-[5.5rem] w-[5.5rem] overflow-hidden rounded-full shadow-lg ring-2 ring-white/70">
        <img
          src={imageSrc}
          alt="Male AI avatar"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {isSpeaking && (
        <div
          className={cx(
            "absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full px-3 py-2",
            "bg-white/80 shadow-sm ring-1 ring-black/5 dark:bg-brand-900/80 dark:ring-white/10",
          )}
          aria-live="polite"
        >
          <span className="sr-only">Agent is speaking</span>
          <div className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className="inline-block w-1 rounded-full bg-brand-600 animate-[voiceBar_1s_ease-in-out_infinite] dark:bg-brand-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
