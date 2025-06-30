import React from 'react'
import MarkdownView from 'react-showdown';

export default function MarkDownToHTML({ markdown }: { markdown: string }) {
  return <MarkdownView markdown={markdown} options={{ tables: true, emoji: true }} />;
}