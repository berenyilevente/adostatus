import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseOutsideClickHandler {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  ref: RefObject<HTMLDivElement>;
  handleClickOutside: (event: any) => void;
}

export function useOutsideClickHandler(
  initialValue: boolean
): UseOutsideClickHandler {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(initialValue);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) setVisible(false);
    },
    [ref, setVisible]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, handleClickOutside]);

  return { visible, setVisible, ref, handleClickOutside };
}
