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
} from 'src/constants/articleProps';
import { useState, useEffect } from 'react';
import { useSidebar } from 'src/hooks/useSidebar';
import { FormProps, OptionType } from '../../types';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({ globalState, onUpdate }: FormProps) => {
	const [localState, setLocalState] = useState(globalState);
	const { isOpen, setIsOpen, ref } = useSidebar();

	const handleChangeAsideState = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdate(localState);
	};

	const handleReset = () => {
		setLocalState(defaultArticleState);
		onUpdate(defaultArticleState);
	};

	const handleFieldChange = (
		field: keyof typeof localState,
		option: OptionType
	) => {
		setLocalState({
			...localState,
			[field]: option,
		});
	};

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
				ref={ref}
				className={clsx(styles.container, isOpen ? styles.container_open : '')}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localState.fontFamilyOption}
						onChange={handleFieldChange.bind(this, 'fontFamilyOption')}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={handleFieldChange.bind(this, 'fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={localState.fontColor}
						onChange={handleFieldChange.bind(this, 'fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={handleFieldChange.bind(this, 'backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={handleFieldChange.bind(this, 'contentWidth')}
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
