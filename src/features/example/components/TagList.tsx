import Tag from '@/components/tag/Tag';

interface TagListProps {
  tags: string[];
}
const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex gap-2">
      {tags &&
        tags.map((tag, index) => (
          <Tag variant="outline" key={index} label={tag} />
        ))}
    </div>
  );
};

export default TagList;
