'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { categories } from '@/data/categories';
import { Example } from '@/types/example';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag as TagIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { z } from 'zod';

import { supabase } from '@/lib/supabase/client';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import FormBtnGroup from '@/components/form/FormBtnGroup';
import FormSection from '@/components/form/FormSection';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import Tag from '../tag/Tag';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  type: z.string().min(1, { message: '카테고리는 필수 선택 항목입니다.' }),
  title: z.string().min(1, { message: '제목은 필수 입력 항목입니다.' }),
  description: z.string().min(1, { message: '설명은 필수 입력 항목입니다.' }),
  content: z.string().min(1, { message: '내용은 필수 입력 항목입니다.' }),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

interface WriteFormProps {
  exampleData: Example;
}

///여기는 폼 컴포넌트인데 너무 많은걸 하고 있음
const defaultValues = {
  type: '',
  title: '',
  description: '',
  content: '',
  tags: [],
  thumbnail: '',
};

const WriteForm = ({ exampleData }: WriteFormProps) => {
  const [tags, setTags] = useState([]);
  const isEditMode = Boolean(exampleData);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: exampleData || defaultValues,
  });

  const preventEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const raw = e.target.value.trim();

      if (!raw || tags.includes(raw)) return;

      const updatedTags = [...tags, raw];

      setTags(updatedTags);
      e.target.value = '';
    }
  };

  const handleDeleteTag = tag => {
    const updatedTags = tags.filter(t => t !== tag);
    setTags(updatedTags);
  };

  // 코드펜, 코드샌드박스만 있음
  const getThumbnailUrl = src => {
    const codepenMatch = src.match(/codepen\.io\/([^/]+)\/embed\/([^?]+)/);
    if (codepenMatch) {
      return `https://shots.codepen.io/${codepenMatch[1]}/pen/${codepenMatch[2]}-1280.jpg`;
    }
    const codesandboxMatch = src.match(/codesandbox\.io\/embed\/([^?/]+)/);
    if (codesandboxMatch) {
      return `https://codesandbox.io/api/v1/sandboxes/${codesandboxMatch[1]}/screenshot.png`;
    }
    return null;
  };

  const extractThumbnailUrl = content => {
    const match = content.match(/<iframe[^>]+src="([^"]+)"[^>]*>/);
    if (!match) return '/default-thumbnail.png'; // 만들기

    const src = match[1];
    return getThumbnailUrl(src) ?? '/default-thumbnail.png';
  };

  const onSubmit = async (data: FormValues) => {
    const thumbnailUrl = extractThumbnailUrl(data.content);

    const formData = {
      type: data.type,
      title: data.title,
      description: data.description,
      content: data.content,
      thumbnail: thumbnailUrl,
      tags,
    };

    const query = isEditMode
      ? supabase.from('examples').update(formData).eq('id', exampleData.id)
      : supabase.from('examples').insert(formData);

    try {
      const { error } = await query;
      if (error) throw error; /// 이거 꼭 있어야 하나???

      toast.success(
        `${isEditMode ? '예제 수정' : '예제 등록'}이 완료되었습니다.`,
      );
    } catch (err: unknown) {
      console.error(err);
      toast.error('저장 실패');
    }
  };

  useEffect(() => {
    if (exampleData) {
      setTags(exampleData.tags);
    } else {
      form.reset(defaultValues);
      setTags([]);
    }
  }, [exampleData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* 텍스트 */}
          <div className="flex flex-col gap-6">
            <FormSection className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">제목</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Scroll Animations..."
                          onKeyDown={preventEnterKey}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        카테고리
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="카테고리 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem
                              key={category.type}
                              value={category.type}
                            >
                              {category.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">설명</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder=" 스크롤 애니메이션을 쉽게 만들 수 있는 방법을 소개합니다."
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>
            <FormSection>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">내용</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSection>
            <FormSection>
              <div>
                <div className="mb-2 flex items-center gap-2 text-lg">
                  <TagIcon size={18} className="text-primary" />
                  태그
                </div>
                <Input
                  placeholder="태그를 엔터로 구분하여 입력하세요"
                  onKeyDown={e => handleKeyDown(e)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    label={tag}
                    removable
                    onClickRemove={() => handleDeleteTag(tag)}
                  />
                ))}
              </div>
            </FormSection>
          </div>
          <FormBtnGroup isEditMode={isEditMode} />
        </form>
      </Form>
    </motion.div>
  );
};

export default WriteForm;
