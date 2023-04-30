import { useEffect } from 'react';

interface IProps {
  ref: React.RefObject<HTMLInputElement>;
  callback: () => void;
}

export default function useOutsideClick({ ref, callback }: IProps): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
