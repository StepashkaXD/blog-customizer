import { useState, useRef, useEffect } from 'react';

export const useSidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLElement | null>(null);

	const closeSidebar = () => {
		setIsOpen(false);
	};

	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			closeSidebar();
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeSidebar();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClick);
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.removeEventListener('mousedown', handleClick);
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [isOpen]);
	return { isOpen, setIsOpen, ref };
};
