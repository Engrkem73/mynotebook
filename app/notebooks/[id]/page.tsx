
import NotebookView from './notebook-view';
import { PageProps } from '../../../types';

export default function NotebookPage({ params }: PageProps) {
  return (
      <NotebookView params={params}/>
  );
}
