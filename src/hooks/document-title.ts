import { useEffect } from 'react';
import { APP_NAME } from '../const';

function saveInitialTitle() {
  const initialTitle = document.title;
  return () => {
    document.title = initialTitle;
  };
}

function useDocumentTitle(title: string) {
  useEffect(saveInitialTitle, []);

  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
  }, [title]);
}

export { useDocumentTitle };
