import { useState } from 'react';

export function useLocalStorage<T>({ key }: { key: string }): [T, (value: T) => void, () => void] {
    const storedValue = localStorage.getItem(key);
    const [state, setState] = useState<T>(storedValue && JSON.parse(storedValue));

    const updateState = (value: T) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    const clear = () => localStorage.removeItem(key);

    return [state, updateState, clear];
}
