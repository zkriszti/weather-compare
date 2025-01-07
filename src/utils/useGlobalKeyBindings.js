import { onKeyStroke } from "@vueuse/core";

export function useGlobalKeyBindings(bindingsMap) {
  Object.entries(bindingsMap).forEach(([key, callback]) => {
    onKeyStroke(
      key,
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
          callback(e);
        }
      },
      { target: window }
    );
  });
}
