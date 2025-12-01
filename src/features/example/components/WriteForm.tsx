'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag as TagIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';
import { extractThumbnailUrl } from '@/lib/utils';
import useSupabaseRequest from '@/hooks/useSupabaseRequest';
import useTags from '@/hooks/useTags';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import FormBtnGroup from '@/components/form/FormBtnGroup';
import FormSection from '@/components/form/FormSection';
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
import { categories } from '@/features/category/data/categories';
import type { Example } from '@/features/example/types/example';

import Tag from '../../../components/tag/Tag';
import { FORM_MESSAGES, formSchema, type FormValues } from '../formSchema';

interface WriteFormProps {
  exampleData?: Example;
}

// 분리 필요하니
const DEFAULT_FORM_VALUES = {
  type: '',
  title: '',
  description: '',
  content: '',
  thumbnail: '',
};
// form 로그인페이지하고 비교하기
const WriteForm = ({ exampleData }: WriteFormProps) => {
  const { tags, removeTag, handleKeyDown } = useTags(exampleData?.tags ?? []);
  const isEditMode = Boolean(exampleData);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: exampleData || DEFAULT_FORM_VALUES,
  });

  // 분리하는게 나을까...
  const { execute, isLoading } = useSupabaseRequest<FormValues>({
    requestFn: async formData => {
      if (isEditMode && exampleData) {
        return await supabase
          .from('examples')
          .update(formData)
          .eq('id', exampleData.id);
      } else {
        return await supabase.from('examples').insert(formData);
      }
    },
    onSuccess: () => {
      toast.success(
        isEditMode
          ? FORM_MESSAGES.SUCCESS_UPDATE
          : FORM_MESSAGES.SUCCESS_CREATE,
      );
    },
    onError: error => {
      console.error('예제 저장 실패', error);
      toast.error(FORM_MESSAGES.ERROR_SAVE);
    },
  });

  const onSubmit = async (data: FormValues) => {
    const thumbnailUrl = extractThumbnailUrl(data.content);

    const formData = {
      ...data,
      thumbnail: thumbnailUrl,
      tags,
    };

    execute(formData);
  };

  useEffect(() => {
    if (!exampleData) {
      form.reset(DEFAULT_FORM_VALUES);
    }
  }, [exampleData, form]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          onKeyDown={e =>
                            e.key === 'Enter' && e.preventDefault()
                          }
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
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mt-3 flex gap-2">
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    label={tag}
                    removable
                    onClickRemove={() => removeTag(tag)}
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
