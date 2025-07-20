import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import { CSSProperties, useState } from 'react';
export const App = () => {
	const [globalState, setGlobalState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': globalState.fontFamilyOption.value,
					'--font-size': globalState.fontSizeOption.value,
					'--font-color': globalState.fontColor.value,
					'--container-width': globalState.contentWidth.value,
					'--bg-color': globalState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm globalState={globalState} onUpdate={setGlobalState} />
			<Article />
		</main>
	);
};
