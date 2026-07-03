import React from 'react';
import ChapterContainer from '@/components/ChapterContainer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const chapterId = parseInt(resolvedParams.id, 10);

  return (
    <div className="min-h-[80vh] w-full">
      <ChapterContainer id={chapterId} />
    </div>
  );
}
