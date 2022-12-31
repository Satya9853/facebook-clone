import { useEffect } from "react";

const useClickOutside = (ref, fun) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      fun();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    const removeEventListenerFunction = () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    return removeEventListenerFunction;
  }, [ref]);
};
export default useClickOutside;
