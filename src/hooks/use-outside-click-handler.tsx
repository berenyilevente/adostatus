import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface UseOutsideClickHandler<T> {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  ref: RefObject<T | null>;
  handleClickOutside: (event: MouseEvent) => void;
}

export function useOutsideClickHandler<T extends HTMLElement>(
  initialValue?: boolean
): UseOutsideClickHandler<T> {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(initialValue ?? false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setVisible(false);
    },
    [ref, setVisible]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, handleClickOutside]);

  return { visible, setVisible, ref, handleClickOutside };
}
