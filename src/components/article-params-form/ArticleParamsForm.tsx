import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type FormProps = {
	globalState: typeof defaultArticleState;
	onUpdate: (newState: typeof defaultArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ globalState, onUpdate, onReset }: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localState, setLocalState] = useState(globalState);

	const asideRef = useRef<HTMLElement | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdate(localState);
	};

	const handleReset = () => {
		setLocalState(defaultArticleState);
		onReset();

	};

	const handleChangeAsideState = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClick);
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.removeEventListener('mousedown', handleClick);
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [isOpen]);

	useEffect(() => {
		setLocalState(globalState);
	}, [globalState]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handleChangeAsideState();
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen ? styles.container_open : '')}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						children='задайте параметры'
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
					/>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localState.fontFamilyOption}
						onChange={(option) => {
							setLocalState({
								...localState,
								fontFamilyOption: option,
							});
						}}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={(option) => {
							setLocalState({
								...localState,
								fontSizeOption: option,
							});
						}}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={localState.fontColor}
						onChange={(option) => {
							setLocalState({
								...localState,
								fontColor: option,
							});
						}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={(option) => {
							setLocalState({
								...localState,
								backgroundColor: option,
							});
						}}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={(option) => {
							setLocalState({
								...localState,
								contentWidth: option,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
