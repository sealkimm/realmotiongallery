import { categories } from '@/features/category/data/categories';

import type { ExampleDetails, RawExample } from '../types/example';

export const transformExampleData = (
  data: RawExample[],
  userId?: string,
): ExampleDetails[] => {
  const result = data.map(
    ({ users, comments, likes, user_like, user_bookmark, ...item }) => ({
      ...item,
      author: users,
      commentCount: comments?.[0]?.count ?? 0,
      likeCount: likes?.[0]?.count ?? 0,
      isLiked: user_like?.some(i => i.user_id === userId) ?? false,
      isBookmarked: user_bookmark?.some(i => i.user_id === userId) ?? false,
    }),
  );
  return result;
};

export const groupExamplesByCategory = (examples: ExampleDetails[]) => {
  const result = categories
    .map(category => {
      const categoryExamples = examples
        .filter(example => example.type === category.type)
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);
      return {
        ...category,
        examples: categoryExamples,
      };
    })
    .filter(category => category.examples.length > 0);
  return result;
};
