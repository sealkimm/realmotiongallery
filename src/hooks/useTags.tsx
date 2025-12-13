'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const MAX_TAGS = 5;

const useTags = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initialTags);

  const addTag = (raw: string) => {
    const tag = raw.trim();

    if (!tag || tags.includes(tag)) return;

    if (tags.length >= MAX_TAGS) {
      toast.error('태그는 최대 5개까지만 추가할 수 있습니다.');
      return;
    }

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

  return { tags, removeTag, handleKeyDown, setTags };
};

export default useTags;
