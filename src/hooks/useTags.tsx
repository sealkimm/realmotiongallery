'use client';

import { useState } from 'react';

const useTags = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initialTags);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || tags.includes(tag)) return;
    setTags(prev => [...prev, tag]);
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addTag(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return { tags, removeTag, handleKeyDown };
};

export default useTags;
