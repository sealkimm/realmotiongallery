'use client';

import { useState } from 'react';

import type { FormValues } from '@/features/example/formSchema';

const useAITag = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTags = async (formValues: FormValues) => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/tag-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      return data.tags ?? [];
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateTags,
    isGenerating,
  };
};

export default useAITag;
