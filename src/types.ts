import { ArticleStateType } from './constants/articleProps';

export type FormProps = {
  globalState: ArticleStateType;
  onUpdate: (newState: ArticleStateType) => void;
  onReset: () => void;
};

export type ArrowButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export type OptionType = {
	title: string;
	value: string;
	className: string;
	optionClassName?: string;
};
