import * as React from 'react';
import { isValidElement, useState, useRef, useEffect } from 'react';
import { i as isRedirect } from './ssr.mjs';
import { useRouter } from '@tanstack/react-router';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { FileIcon } from '@untitledui/file-icons';
import { Link03, Image01, X, Edit04, Stars02, Copy01, User01 } from '@untitledui/icons';
import { Link, Button as Button$1, TextArea, TooltipTrigger, Tooltip as Tooltip$1, OverlayArrow } from 'react-aria-components';
import { extendTailwindMerge } from 'tailwind-merge';

function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(
    async (...args) => {
      try {
        const res = await serverFn(...args);
        if (isRedirect(res)) {
          throw res;
        }
        return res;
      } catch (err) {
        if (isRedirect(err)) {
          err.options._fromLocation = router.state.location;
          return router.navigate(router.resolveRedirect(err).options);
        }
        throw err;
      }
    },
    [router, serverFn]
  );
}
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"]
    }
  }
});
const cx = twMerge;
function sortCx(classes) {
  return classes;
}
const isFunctionComponent = (component) => {
  return typeof component === "function";
};
const isClassComponent = (component) => {
  return typeof component === "function" && component.prototype && (!!component.prototype.isReactComponent || !!component.prototype.render);
};
const isForwardRefComponent = (component) => {
  return typeof component === "object" && component !== null && component.$$typeof.toString() === "Symbol(react.forward_ref)";
};
const isReactComponent = (component) => {
  return isFunctionComponent(component) || isForwardRefComponent(component) || isClassComponent(component);
};
const styles$2 = sortCx({
  common: {
    root: [
      "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2",
      // When button is used within `InputGroup`
      "in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none",
      // Disabled styles
      "disabled:cursor-not-allowed disabled:text-fg-disabled",
      // Icon styles
      "disabled:*:data-icon:text-fg-disabled_subtle",
      // Same as `icon` but for SSR icons that cannot be passed to the client as functions.
      "*:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all"
    ].join(" "),
    icon: "pointer-events-none size-5 shrink-0 transition-inherit-all"
  },
  sizes: {
    sm: {
      root: [
        "gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2",
        "in-data-input-wrapper:px-3.5 in-data-input-wrapper:py-2.5 in-data-input-wrapper:data-icon-only:p-2.5"
      ].join(" "),
      linkRoot: "gap-1"
    },
    md: {
      root: [
        "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5",
        "in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:text-md in-data-input-wrapper:data-icon-only:p-3"
      ].join(" "),
      linkRoot: "gap-1"
    },
    lg: {
      root: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3",
      linkRoot: "gap-1.5"
    },
    xl: {
      root: "gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-3.5",
      linkRoot: "gap-1.5"
    }
  },
  colors: {
    primary: {
      root: [
        "bg-brand-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover data-loading:bg-brand-solid_hover",
        // Inner border gradient
        "before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0%",
        // Disabled styles
        "disabled:bg-disabled disabled:shadow-xs disabled:ring-disabled_subtle",
        // Icon styles
        "*:data-icon:text-button-primary-icon hover:*:data-icon:text-button-primary-icon_hover"
      ].join(" ")
    },
    secondary: {
      root: [
        "bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover",
        // Disabled styles
        "disabled:shadow-xs disabled:ring-disabled_subtle",
        // Icon styles
        "*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover"
      ].join(" ")
    },
    tertiary: {
      root: [
        "text-tertiary hover:bg-primary_hover hover:text-tertiary_hover data-loading:bg-primary_hover",
        // Icon styles
        "*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover"
      ].join(" ")
    },
    "link-gray": {
      root: [
        "justify-normal rounded p-0! text-tertiary hover:text-tertiary_hover",
        // Inner text underline
        "*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current",
        // Icon styles
        "*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover"
      ].join(" ")
    },
    "link-color": {
      root: [
        "justify-normal rounded p-0! text-brand-secondary hover:text-brand-secondary_hover",
        // Inner text underline
        "*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current",
        // Icon styles
        "*:data-icon:text-fg-brand-secondary_alt hover:*:data-icon:text-fg-brand-secondary_hover"
      ].join(" ")
    },
    "primary-destructive": {
      root: [
        "bg-error-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent outline-error ring-inset",
        // Inner border gradient
        "before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0%",
        // Disabled styles
        "disabled:bg-disabled disabled:shadow-xs disabled:ring-disabled_subtle",
        // Icon styles
        "*:data-icon:text-button-destructive-primary-icon hover:*:data-icon:text-button-destructive-primary-icon_hover"
      ].join(" ")
    },
    "secondary-destructive": {
      root: [
        "bg-primary text-error-primary shadow-xs-skeumorphic ring-1 ring-error_subtle outline-error ring-inset hover:bg-error-primary hover:text-error-primary_hover data-loading:bg-error-primary",
        // Disabled styles
        "disabled:bg-primary disabled:shadow-xs disabled:ring-disabled_subtle",
        // Icon styles
        "*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary"
      ].join(" ")
    },
    "tertiary-destructive": {
      root: [
        "text-error-primary outline-error hover:bg-error-primary hover:text-error-primary_hover data-loading:bg-error-primary",
        // Icon styles
        "*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary"
      ].join(" ")
    },
    "link-destructive": {
      root: [
        "justify-normal rounded p-0! text-error-primary outline-error hover:text-error-primary_hover",
        // Inner text underline
        "*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current",
        // Icon styles
        "*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary"
      ].join(" ")
    }
  }
});
const Button = ({
  size = "sm",
  color = "primary",
  children,
  className,
  noTextPadding,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  isDisabled: disabled,
  isLoading: loading,
  showTextWhileLoading,
  ...otherProps
}) => {
  const href = "href" in otherProps ? otherProps.href : void 0;
  const Component = href ? Link : Button$1;
  const isIcon = (IconLeading || IconTrailing) && !children;
  const isLinkType = ["link-gray", "link-color", "link-destructive"].includes(color);
  noTextPadding = isLinkType || noTextPadding;
  let props = {};
  if (href) {
    props = {
      ...otherProps,
      href: disabled ? void 0 : href,
      // Since anchor elements do not support the `disabled` attribute and state,
      // we need to specify `data-rac` and `data-disabled` in order to be able
      // to use the `disabled:` selector in classes.
      ...disabled ? { "data-rac": true, "data-disabled": true } : {}
    };
  } else {
    props = {
      ...otherProps,
      type: otherProps.type || "button",
      isPending: loading,
      isDisabled: disabled
    };
  }
  return /* @__PURE__ */ jsxs(
    Component,
    {
      "data-loading": loading ? true : void 0,
      "data-icon-only": isIcon ? true : void 0,
      ...props,
      className: cx(
        styles$2.common.root,
        styles$2.sizes[size].root,
        styles$2.colors[color].root,
        isLinkType && styles$2.sizes[size].linkRoot,
        (loading || href && (disabled || loading)) && "pointer-events-none",
        // If in `loading` state, hide everything except the loading icon (and text if `showTextWhileLoading` is true).
        loading && (showTextWhileLoading ? "[&>*:not([data-icon=loading]):not([data-text])]:hidden" : "[&>*:not([data-icon=loading])]:invisible"),
        className
      ),
      children: [
        isValidElement(IconLeading) && IconLeading,
        isReactComponent(IconLeading) && /* @__PURE__ */ jsx(IconLeading, { "data-icon": "leading", className: styles$2.common.icon }),
        loading && /* @__PURE__ */ jsxs(
          "svg",
          {
            fill: "none",
            "data-icon": "loading",
            viewBox: "0 0 20 20",
            className: cx(styles$2.common.icon, !showTextWhileLoading && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"),
            children: [
              /* @__PURE__ */ jsx("circle", { className: "stroke-current opacity-30", cx: "10", cy: "10", r: "8", fill: "none", strokeWidth: "2" }),
              /* @__PURE__ */ jsx(
                "circle",
                {
                  className: "origin-center animate-spin stroke-current",
                  cx: "10",
                  cy: "10",
                  r: "8",
                  fill: "none",
                  strokeWidth: "2",
                  strokeDasharray: "12.5 50",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        children && /* @__PURE__ */ jsx("span", { "data-text": true, className: cx("transition-inherit-all", !noTextPadding && "px-0.5"), children }),
        isValidElement(IconTrailing) && IconTrailing,
        isReactComponent(IconTrailing) && /* @__PURE__ */ jsx(IconTrailing, { "data-icon": "trailing", className: styles$2.common.icon })
      ]
    }
  );
};
const Tooltip = ({
  title,
  description,
  children,
  arrow = false,
  delay = 300,
  closeDelay = 0,
  trigger,
  isDisabled,
  isOpen,
  defaultOpen,
  offset = 6,
  crossOffset,
  placement = "top",
  onOpenChange,
  ...tooltipProps
}) => {
  const isTopOrBottomLeft = ["top left", "top end", "bottom left", "bottom end"].includes(placement);
  const isTopOrBottomRight = ["top right", "top start", "bottom right", "bottom start"].includes(placement);
  const calculatedCrossOffset = isTopOrBottomLeft ? -12 : isTopOrBottomRight ? 12 : 0;
  return /* @__PURE__ */ jsxs(TooltipTrigger, { ...{ trigger, delay, closeDelay, isDisabled, isOpen, defaultOpen, onOpenChange }, children: [
    children,
    /* @__PURE__ */ jsx(
      Tooltip$1,
      {
        ...tooltipProps,
        offset,
        placement,
        crossOffset: crossOffset != null ? crossOffset : calculatedCrossOffset,
        className: ({ isEntering, isExiting }) => cx(isEntering && "ease-out animate-in", isExiting && "ease-in animate-out"),
        children: ({ isEntering, isExiting }) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx(
              "z-50 flex max-w-xs origin-(--trigger-anchor-point) flex-col items-start gap-1 rounded-lg bg-primary-solid px-3 shadow-lg will-change-transform",
              description ? "py-3" : "py-2",
              isEntering && "ease-out animate-in fade-in zoom-in-95 in-placement-left:slide-in-from-right-0.5 in-placement-right:slide-in-from-left-0.5 in-placement-top:slide-in-from-bottom-0.5 in-placement-bottom:slide-in-from-top-0.5",
              isExiting && "ease-in animate-out fade-out zoom-out-95 in-placement-left:slide-out-to-right-0.5 in-placement-right:slide-out-to-left-0.5 in-placement-top:slide-out-to-bottom-0.5 in-placement-bottom:slide-out-to-top-0.5"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-white", children: title }),
              description && /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-tooltip-supporting-text", children: description }),
              arrow && /* @__PURE__ */ jsx(OverlayArrow, { children: /* @__PURE__ */ jsx(
                "svg",
                {
                  viewBox: "0 0 100 100",
                  className: "size-2.5 fill-bg-primary-solid in-placement-left:-rotate-90 in-placement-right:rotate-90 in-placement-top:rotate-0 in-placement-bottom:rotate-180",
                  children: /* @__PURE__ */ jsx("path", { d: "M0,0 L35.858,35.858 Q50,50 64.142,35.858 L100,0 Z" })
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
};
const sizes$1 = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
  "2xl": "size-4",
  "3xl": "size-4.5",
  "4xl": "size-5"
};
const AvatarOnlineIndicator = ({ size, status, className }) => /* @__PURE__ */ jsx(
  "span",
  {
    className: cx(
      "absolute right-0 bottom-0 rounded-full ring-[1.5px] ring-bg-primary",
      status === "online" ? "bg-fg-success-secondary" : "bg-fg-disabled_subtle",
      sizes$1[size],
      className
    )
  }
);
const sizes = {
  xs: { root: "size-2.5", tick: "size-[4.38px" },
  sm: { root: "size-3", tick: "size-[5.25px]" },
  md: { root: "size-3.5", tick: "size-[6.13px]" },
  lg: { root: "size-4", tick: "size-[7px]" },
  xl: { root: "size-4.5", tick: "size-[7.88px]" },
  "2xl": { root: "size-5", tick: "size-[8.75px]" },
  "3xl": { root: "size-6", tick: "size-[10.5px]" },
  "4xl": { root: "size-8", tick: "size-[14px]" }
};
const VerifiedTick = ({ size, className }) => /* @__PURE__ */ jsxs("svg", { "data-verified": true, className: cx("z-10 text-utility-blue-500", sizes[size].root, className), viewBox: "0 0 10 10", fill: "none", children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M7.72237 1.77098C7.81734 2.00068 7.99965 2.18326 8.2292 2.27858L9.03413 2.61199C9.26384 2.70714 9.44635 2.88965 9.5415 3.11936C9.63665 3.34908 9.63665 3.60718 9.5415 3.83689L9.20833 4.64125C9.11313 4.87106 9.113 5.12943 9.20863 5.35913L9.54122 6.16325C9.58839 6.27702 9.61268 6.39897 9.6127 6.52214C9.61272 6.6453 9.58847 6.76726 9.54134 6.88105C9.4942 6.99484 9.42511 7.09823 9.33801 7.18531C9.2509 7.27238 9.14749 7.34144 9.03369 7.38854L8.22934 7.72171C7.99964 7.81669 7.81706 7.99899 7.72174 8.22855L7.38833 9.03348C7.29318 9.26319 7.11067 9.4457 6.88096 9.54085C6.65124 9.636 6.39314 9.636 6.16343 9.54085L5.35907 9.20767C5.12935 9.11276 4.87134 9.11295 4.64177 9.20821L3.83684 9.54115C3.60725 9.63608 3.34937 9.636 3.11984 9.54092C2.89032 9.44585 2.70791 9.26356 2.6127 9.03409L2.27918 8.22892C2.18421 7.99923 2.0019 7.81665 1.77235 7.72133L0.967421 7.38792C0.737807 7.29281 0.555355 7.11041 0.460169 6.88083C0.364983 6.65125 0.364854 6.39327 0.45981 6.16359L0.792984 5.35924C0.8879 5.12952 0.887707 4.87151 0.792445 4.64193L0.459749 3.83642C0.41258 3.72265 0.388291 3.60069 0.388272 3.47753C0.388252 3.35436 0.412501 3.2324 0.459634 3.11861C0.506767 3.00482 0.57586 2.90144 0.662965 2.81436C0.75007 2.72728 0.853479 2.65822 0.967283 2.61113L1.77164 2.27795C2.00113 2.18306 2.1836 2.00099 2.27899 1.7717L2.6124 0.966768C2.70755 0.737054 2.89006 0.554547 3.11978 0.459397C3.34949 0.364246 3.60759 0.364246 3.83731 0.459397L4.64166 0.792571C4.87138 0.887487 5.12939 0.887293 5.35897 0.792031L6.16424 0.459913C6.39392 0.364816 6.65197 0.364836 6.88164 0.459968C7.11131 0.555099 7.29379 0.737554 7.38895 0.967208L7.72247 1.77238L7.72237 1.77098Z",
      className: "fill-current"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M6.95829 3.68932C7.02509 3.58439 7.04747 3.45723 7.02051 3.3358C6.99356 3.21437 6.91946 3.10862 6.81454 3.04182C6.70961 2.97502 6.58245 2.95264 6.46102 2.97959C6.33959 3.00655 6.23384 3.08064 6.16704 3.18557L4.33141 6.06995L3.49141 5.01995C3.41375 4.92281 3.30069 4.8605 3.17709 4.84673C3.05349 4.83296 2.92949 4.86885 2.83235 4.94651C2.73522 5.02417 2.67291 5.13723 2.65914 5.26083C2.64536 5.38443 2.68125 5.50843 2.75891 5.60557L4.00891 7.16807C4.0555 7.22638 4.11533 7.27271 4.18344 7.30323C4.25154 7.33375 4.32595 7.34757 4.40047 7.34353C4.47499 7.3395 4.54747 7.31773 4.61188 7.28004C4.67629 7.24234 4.73077 7.18981 4.77079 7.12682L6.95829 3.68932Z",
      fill: "white"
    }
  )
] });
const styles$1 = {
  xxs: { root: "size-4 outline-[0.5px] -outline-offset-[0.5px]", initials: "text-xs font-semibold", icon: "size-3" },
  xs: { root: "size-6 outline-[0.5px] -outline-offset-[0.5px]", initials: "text-xs font-semibold", icon: "size-4" },
  sm: { root: "size-8 outline-[0.75px] -outline-offset-[0.75px]", initials: "text-sm font-semibold", icon: "size-5" },
  md: { root: "size-10 outline-1 -outline-offset-1", initials: "text-md font-semibold", icon: "size-6" },
  lg: { root: "size-12 outline-1 -outline-offset-1", initials: "text-lg font-semibold", icon: "size-7" },
  xl: { root: "size-14 outline-1 -outline-offset-1", initials: "text-xl font-semibold", icon: "size-8" },
  "2xl": { root: "size-16 outline-1 -outline-offset-1", initials: "text-display-xs font-semibold", icon: "size-8" }
};
const Avatar = ({
  contrastBorder = true,
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  badge,
  status,
  verified,
  focusable = false,
  className
}) => {
  const [isFailed, setIsFailed] = useState(false);
  const renderMainContent = () => {
    if (src && !isFailed) {
      return /* @__PURE__ */ jsx("img", { "data-avatar-img": true, className: "size-full rounded-full object-cover", src, alt, onError: () => setIsFailed(true) });
    }
    if (initials) {
      return /* @__PURE__ */ jsx("span", { className: cx("text-quaternary", styles$1[size].initials), children: initials });
    }
    if (PlaceholderIcon) {
      return /* @__PURE__ */ jsx(PlaceholderIcon, { className: cx("text-fg-quaternary", styles$1[size].icon) });
    }
    return placeholder || /* @__PURE__ */ jsx(User01, { className: cx("text-fg-quaternary", styles$1[size].icon) });
  };
  const renderBadgeContent = () => {
    if (status) {
      return /* @__PURE__ */ jsx(AvatarOnlineIndicator, { status, size: size === "xxs" ? "xs" : size });
    }
    if (verified) {
      return /* @__PURE__ */ jsx(
        VerifiedTick,
        {
          size: size === "xxs" ? "xs" : size,
          className: cx("absolute right-0 bottom-0", (size === "xxs" || size === "xs") && "-right-px -bottom-px")
        }
      );
    }
    return badge;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-avatar": true,
      className: cx(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-transparent",
        // Focus styles
        focusable && "group-outline-focus-ring group-focus-visible:outline-2 group-focus-visible:outline-offset-2",
        contrastBorder && "outline outline-avatar-contrast-border",
        styles$1[size].root,
        className
      ),
      children: [
        renderMainContent(),
        renderBadgeContent()
      ]
    }
  );
};
const MessageStatus = ({ status, readAt }) => {
  return /* @__PURE__ */ jsx(Tooltip, { title: status === "sent" ? "Unread" : status === "read" ? `Read${readAt ? ` ${readAt}` : ""}` : "Failed", children: /* @__PURE__ */ jsx(Button$1, { className: "focus:outline-hidden", children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: [
    status === "sent" && /* @__PURE__ */ jsx("path", { d: "M13 5L7 11L4 8", className: "stroke-fg-quaternary", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    status === "read" && /* @__PURE__ */ jsx(
      "path",
      {
        d: "M10.5 5L4.5 11L1.5 8M14.5 5L8.5 11L6.5 9",
        className: "stroke-fg-brand-secondary",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    status === "failed" && /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM7.25 5C7.25 4.58579 7.58579 4.25 8 4.25C8.41421 4.25 8.75 4.58579 8.75 5V8.5C8.75 8.91421 8.41421 9.25 8 9.25C7.58579 9.25 7.25 8.91421 7.25 8.5V5ZM8 11.75C8.41421 11.75 8.75 11.4142 8.75 11C8.75 10.5858 8.41421 10.25 8 10.25C7.58579 10.25 7.25 10.5858 7.25 11C7.25 11.4142 7.58579 11.75 8 11.75Z",
        className: "fill-fg-error-primary"
      }
    )
  ] }) }) });
};
const MessageItem = ({ msg, showUserLabel = true, onCorrect, onSimplify, ...props }) => {
  var _a, _b, _c;
  const renderActions = () => /* @__PURE__ */ jsxs("div", { className: "dark-mode absolute right-2 -bottom-5 z-1 flex gap-1.5 rounded-lg bg-primary_alt px-2 py-1.5 opacity-0 shadow-xl transition duration-100 ease-linear group-hover/msg:opacity-100", children: [
    onCorrect && msg.text && /* @__PURE__ */ jsx(
      "button",
      {
        title: "Correct this message",
        "aria-label": "Correct this message",
        className: "cursor-pointer rounded p-0.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
        onClick: onCorrect,
        children: /* @__PURE__ */ jsx(Edit04, { className: "size-4" })
      }
    ),
    onSimplify && msg.text && /* @__PURE__ */ jsx(
      "button",
      {
        title: "Simplify this answer",
        "aria-label": "Simplify this answer",
        className: "cursor-pointer rounded p-0.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
        onClick: onSimplify,
        children: /* @__PURE__ */ jsx(Stars02, { className: "size-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        title: "Copy",
        "aria-label": "Copy",
        className: "cursor-pointer rounded p-0.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
        children: /* @__PURE__ */ jsx(Copy01, { className: "size-4" })
      }
    )
  ] });
  return /* @__PURE__ */ jsxs("li", { ...props, className: cx("relative flex items-start gap-3", ((_a = msg.user) == null ? void 0 : _a.me) ? "self-end pl-10" : "pr-8 lg:pr-10", props.className), children: [
    msg.user && !msg.user.me && /* @__PURE__ */ jsx(Avatar, { src: msg.user.avatarUrl, alt: msg.user.name, size: "md", status: msg.user.status }),
    /* @__PURE__ */ jsxs("article", { className: "flex min-w-0 flex-1 flex-col gap-1.5", children: [
      (msg.user && showUserLabel || msg.sentAt || msg.status) && /* @__PURE__ */ jsxs("header", { className: "flex items-center gap-2", children: [
        msg.user && showUserLabel && /* @__PURE__ */ jsx("cite", { className: "flex-1 truncate text-sm font-medium text-secondary not-italic", children: msg.user.me ? "You" : msg.user.name }),
        (msg.sentAt || msg.status) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5", children: [
          msg.sentAt && /* @__PURE__ */ jsx("time", { className: "text-xs text-tertiary", dateTime: msg.sentAt, children: msg.sentAt }),
          msg.status && /* @__PURE__ */ jsx(MessageStatus, { status: msg.status, readAt: msg.readAt })
        ] })
      ] }),
      msg.text ? /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx(
            "group/msg relative rounded-lg px-3 py-2 text-md text-primary ring-1 ring-secondary ring-inset",
            ((_b = msg.user) == null ? void 0 : _b.me) ? "rounded-tr-none bg-primary pr-4" : "rounded-tl-none bg-secondary",
            // Link styles
            "[&_a]:rounded-xs [&_a]:text-brand-secondary [&_a]:underline [&_a]:underline-offset-2 [&_a]:outline-focus-ring [&_a]:transition [&_a]:duration-100 [&_a]:ease-linear [&_a]:hover:text-brand-secondary_hover [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2"
          ),
          children: [
            msg.reply && /* @__PURE__ */ jsx("blockquote", { className: "relative mb-1.5 rounded-lg bg-primary px-3 py-2 text-sm text-tertiary ring-1 ring-secondary ring-inset before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border-l-[3px] before:border-brand", children: msg.reply.text }),
            msg.image && /* @__PURE__ */ jsx("figure", { className: "mt-1 mb-1.5", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: msg.image.src,
                alt: msg.image.alt,
                className: "w-full rounded-md object-cover outline-1 -outline-offset-[0.5px] outline-black/10"
              }
            ) }),
            msg.urlPreview && /* @__PURE__ */ jsxs("aside", { className: "mt-1 mb-1.5 flex items-start gap-1.5 rounded-lg bg-primary p-2 pr-3 ring-1 ring-secondary ring-inset", children: [
              /* @__PURE__ */ jsx(Link03, { className: "mt-0.5 size-4 shrink-0 text-fg-quaternary" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "w-full truncate text-sm font-medium text-secondary", children: msg.urlPreview.title }),
                /* @__PURE__ */ jsx("p", { className: "w-full truncate text-sm text-tertiary", children: msg.urlPreview.description })
              ] })
            ] }),
            msg.text,
            renderActions()
          ]
        }
      ) : msg.image ? /* @__PURE__ */ jsxs("figure", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "group/msg relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: msg.image.src,
              alt: msg.image.alt,
              className: "w-full rounded-md object-cover outline-1 -outline-offset-[0.5px] outline-black/10"
            }
          ),
          renderActions()
        ] }),
        /* @__PURE__ */ jsxs("figcaption", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-sm font-medium text-secondary", children: msg.image.name }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-tertiary", children: msg.image.size })
        ] })
      ] }) : msg.audio ? /* @__PURE__ */ jsxs("div", { className: "group/msg relative flex items-center gap-2 rounded-lg rounded-tl-none bg-primary p-3 ring-1 ring-secondary", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            "aria-label": "Play audio message",
            className: "flex size-8 cursor-pointer items-center justify-center rounded-full bg-fg-brand-primary_alt outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
            children: /* @__PURE__ */ jsx("svg", { width: "12.8", height: "14", viewBox: "0 0 16 16", fill: "none", className: "translate-x-[1px] text-fg-white", children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M2.19995 2.86327C2.19995 1.61155 3.57248 0.844595 4.63851 1.50061L12.9856 6.63731C14.0009 7.26209 14.0009 8.73784 12.9856 9.36262L4.63851 14.4993C3.57247 15.1553 2.19995 14.3884 2.19995 13.1367V2.86327Z",
                fill: "currentColor"
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx("svg", { width: "206", height: "34", viewBox: "0 0 206 34", fill: "none", className: "flex-1 text-fg-brand-primary_alt", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M1 15V19M5 15V19M9 15V19M13 15V19M17 9.00005V25M21 5.00005V29M25 1.00005V33M29 1.00005V33M33 5.00005V29M37 13V21M41 9.00005V25M45 13V21M49 5.00005V29M53 5.00005V29M57 9.00005V25M61 9.00005V25M65 1.00005V33M69 1.00005V33M73 5.00005V29M77 1.00005V33M81 9.00005V25M85 13V21M89 15V19.0001M93 15V19.0001M97 13V21.0001M101 13V21.0001M105 9V25.0001M109 5V29.0001M113 1V33.0001M117 5V29.0001M121 5V29.0001M125 5V29.0001M129 9V25.0001M133 13V21.0001M137 9V25.0001M141 13V21.0001M145 9V25.0001M149 5V29.0001M153 5V29.0001M157 9V25.0001M161 1V33.0001M165 5V29.0001M169 9V25.0001M173 13V21.0001M177 15V19.0001M181 9V25.0001M185 5V29.0001M189 5V29.0001M193 9V25.0001M197 15V19.0001M201 15V19.0001M205 15V19.0001",
            stroke: "currentColor",
            strokeLinecap: "round"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-tertiary", children: msg.audio.duration }),
        renderActions()
      ] }) : null,
      msg.attachment && /* @__PURE__ */ jsxs("div", { className: "group/msg relative flex gap-3 rounded-lg rounded-tl-none bg-primary px-3.5 py-2.5 ring-1 ring-secondary", children: [
        /* @__PURE__ */ jsx(FileIcon, { type: msg.attachment.type, theme: "light", className: "size-10 dark:hidden" }),
        /* @__PURE__ */ jsx(FileIcon, { type: msg.attachment.type, theme: "dark", className: "size-10 not-dark:hidden" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-secondary", children: msg.attachment.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-tertiary", children: msg.attachment.size })
        ] }),
        renderActions()
      ] }),
      msg.reactions && msg.reactions.length > 0 && /* @__PURE__ */ jsx("ul", { className: "flex justify-end gap-1", children: (_c = msg.reactions) == null ? void 0 : _c.map((reaction) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "flex h-6 items-center gap-1 rounded-2xl bg-secondary px-2 py-0.5 ring-1 ring-secondary ring-inset",
          children: [
            reaction.content,
            reaction.count > 1 && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-secondary", children: reaction.count })
          ]
        },
        reaction.content
      )) }),
      msg.typing && /* @__PURE__ */ jsxs("div", { className: "flex h-7 w-10 items-center justify-center gap-1 self-start rounded-lg rounded-tl-none bg-secondary text-md text-primary ring-1 ring-secondary ring-inset", children: [
        /* @__PURE__ */ jsx("div", { className: "size-1 animate-bounce rounded-full bg-fg-tertiary [animation-delay:-0.3s]" }),
        /* @__PURE__ */ jsx("div", { className: "size-1 animate-bounce rounded-full bg-fg-quaternary [animation-delay:-0.15s]" }),
        /* @__PURE__ */ jsx("div", { className: "size-1 animate-bounce rounded-full bg-fg-tertiary" })
      ] })
    ] })
  ] }, msg.id);
};
const styles = {
  secondary: "bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-disabled_subtle",
  tertiary: "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover"
};
const ButtonUtility = ({
  tooltip,
  className,
  isDisabled,
  icon: Icon,
  size = "sm",
  color = "secondary",
  tooltipPlacement = "top",
  ...otherProps
}) => {
  const href = "href" in otherProps ? otherProps.href : void 0;
  const Component = href ? Link : Button$1;
  let props = {};
  if (href) {
    props = {
      ...otherProps,
      href: isDisabled ? void 0 : href,
      // Since anchor elements do not support the `disabled` attribute and state,
      // we need to specify `data-rac` and `data-disabled` in order to be able
      // to use the `disabled:` selector in classes.
      ...isDisabled ? { "data-rac": true, "data-disabled": true } : {}
    };
  } else {
    props = {
      ...otherProps,
      type: otherProps.type || "button",
      isDisabled
    };
  }
  const content = /* @__PURE__ */ jsxs(
    Component,
    {
      "aria-label": tooltip,
      ...props,
      className: cx(
        "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle",
        styles[color],
        // Icon styles
        "*:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all",
        size === "xs" ? "*:data-icon:size-4" : "*:data-icon:size-5",
        className
      ),
      children: [
        isReactComponent(Icon) && /* @__PURE__ */ jsx(Icon, { "data-icon": true }),
        isValidElement(Icon) && Icon
      ]
    }
  );
  if (tooltip) {
    return /* @__PURE__ */ jsx(Tooltip, { title: tooltip, placement: tooltipPlacement, isDisabled, offset: size === "xs" ? 4 : 6, children: content });
  }
  return content;
};
const getResizeHandleBg = (color) => {
  return `url(data:image/svg+xml;base64,${btoa(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 10" stroke="${color}" stroke-linecap="round"/><path d="M11 7L7 11" stroke="${color}" stroke-linecap="round"/></svg>`)})`;
};
const TextAreaBase = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    TextArea,
    {
      ...props,
      style: {
        "--resize-handle-bg": getResizeHandleBg("#D5D7DA"),
        "--resize-handle-bg-dark": getResizeHandleBg("#373A41")
      },
      className: (state) => cx(
        "w-full scroll-py-3 rounded-lg bg-primary px-3.5 py-3 text-md text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:outline-hidden",
        // Resize handle
        "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)",
        state.isFocused && !state.isDisabled && "ring-2 ring-brand",
        state.isDisabled && "cursor-not-allowed bg-disabled_subtle text-disabled ring-disabled",
        state.isInvalid && "ring-error_subtle",
        state.isInvalid && state.isFocused && "ring-2 ring-error",
        typeof className === "function" ? className(state) : className
      )
    }
  );
};
TextAreaBase.displayName = "TextAreaBase";
const MessageActionTextarea = ({
  onSubmit,
  className,
  textAreaClassName,
  ...props
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [docPreview, setDocPreview] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("message");
    if (message.trim() || selectedFile) {
      onSubmit == null ? void 0 : onSubmit(message, selectedFile || void 0);
      (_a = formRef.current) == null ? void 0 : _a.reset();
    }
  };
  const handleAttachClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const setFileFromInput = (file) => {
    setSelectedFile(null);
    setImagePreview(null);
    setDocPreview(null);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
    if (!file) return;
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        var _a;
        return setImagePreview((_a2 = (_a = e.target) == null ? void 0 : _a.result) != null ? _a2 : null);
      };
      reader.readAsDataURL(file);
      return;
    }
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      setSelectedFile(file);
      setPdfPreviewUrl(URL.createObjectURL(file));
      return;
    }
    const isText = file.type.startsWith("text/") || file.type === "application/json" || /\.(txt|csv|md|json)$/i.test(file.name);
    if (isText) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        var _a;
        return setDocPreview((_a2 = (_a = e.target) == null ? void 0 : _a.result) != null ? _a2 : "");
      };
      reader.readAsText(file);
      return;
    }
    setDocPreview(
      "Unsupported file type. Use .txt, .csv, .md, .json, .pdf, or an image."
    );
  };
  const handleFileChange = (e) => {
    var _a2;
    var _a;
    setFileFromInput((_a2 = (_a = e.target.files) == null ? void 0 : _a[0]) != null ? _a2 : null);
  };
  const handleRemove = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setDocPreview(null);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleDragOver = (e) => {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    if ((_a = e.dataTransfer.items) == null ? void 0 : _a.length) setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    var _a2;
    var _a;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setFileFromInput((_a2 = (_a = e.dataTransfer.files) == null ? void 0 : _a[0]) != null ? _a2 : null);
  };
  const handlePaste = (e) => {
    var _a2, _b2;
    var _a, _b;
    const file = (_b2 = (_a = e.clipboardData.files) == null ? void 0 : _a[0]) != null ? _b2 : (_b = Array.from((_a2 = e.clipboardData.items) != null ? _a2 : []).find((i) => i.kind === "file")) == null ? void 0 : _b.getAsFile();
    if (file) setFileFromInput(file);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  useEffect(() => {
    const onKey = (e) => {
      var _a;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        (_a = fileInputRef.current) == null ? void 0 : _a.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const showPanel = (imagePreview || pdfPreviewUrl || docPreview) && (selectedFile || docPreview);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        ref: formRef,
        className: cx(
          "relative flex h-max items-center gap-3",
          isDragOver && "ring-2 ring-brand-500 ring-offset-2 ring-dashed",
          className
        ),
        onSubmit: handleSubmit,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*,.txt,.csv,.md,.json,.pdf,application/pdf",
              onChange: handleFileChange,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative flex flex-1 flex-col", children: [
            /* @__PURE__ */ jsx(
              TextAreaBase,
              {
                "aria-label": "Message",
                placeholder: "Message",
                name: "message",
                onPaste: handlePaste,
                onKeyDown: handleKeyDown,
                className: cx("h-18 w-full resize-none", textAreaClassName)
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[10px] text-fg-quaternary whitespace-nowrap overflow-x-auto min-w-0", children: "Enter to send \xB7 Shift+Enter new line \xB7 \u2318K to attach" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-3.5 bottom-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              ButtonUtility,
              {
                icon: Image01,
                size: "xs",
                color: "tertiary",
                onClick: handleAttachClick,
                type: "button"
              }
            ),
            /* @__PURE__ */ jsx(Button, { size: "sm", color: "link-color", type: "submit", children: "Send" })
          ] })
        ]
      }
    ),
    showPanel && /* @__PURE__ */ jsx("div", { className: "fixed inset-y-0 right-4 z-50 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
        ButtonUtility,
        {
          icon: X,
          size: "xs",
          color: "tertiary",
          onClick: handleRemove,
          type: "button"
        }
      ) }),
      imagePreview ? /* @__PURE__ */ jsx(
        "img",
        {
          src: imagePreview,
          alt: "Preview",
          className: "mt-1 h-[800px] w-[600px] max-h-[90vh] max-w-[65vw] object-contain rounded-xl border border-gray-100 bg-black/5"
        }
      ) : pdfPreviewUrl ? /* @__PURE__ */ jsx(
        "iframe",
        {
          src: pdfPreviewUrl,
          title: "PDF preview",
          className: "mt-1 h-[800px] w-[600px] max-h-[90vh] max-w-[65vw] rounded-xl border border-gray-100 bg-gray-50"
        }
      ) : /* @__PURE__ */ jsx("pre", { className: "mt-1 h-[800px] w-[600px] max-h-[90vh] max-w-[65vw] overflow-y-auto whitespace-pre-wrap rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs", children: docPreview })
    ] }) })
  ] });
};
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export { Button as B, MessageItem as M, MessageActionTextarea as a, convertFileToBase64 as c, useServerFn as u };
//# sourceMappingURL=utils-DTBdiLwI.mjs.map
