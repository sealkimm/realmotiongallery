'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { categories } from '@/data/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import * as htmlToImage from 'html-to-image';
import { Tag, X } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { supabase } from '@/lib/supabaseClient';
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

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  type: z.string().min(1, { message: '카테고리는 필수 선택 항목입니다.' }),
  title: z.string().min(1, { message: '제목은 필수 입력 항목입니다.' }),
  description: z.string().min(1, { message: '설명은 필수 입력 항목입니다.' }),
  content: z.string().min(1, { message: '내용은 필수 입력 항목입니다.' }),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const WriteForm = () => {
  const [tags, setTags] = useState([]);
  const captureRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      title: '',
      description: '',
      content: '',
      thumbnail: '',
      tags: [],
    },
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

  const onSubmit = async (data: FormValues) => {
    try {
      const blob = await captureToBlob(captureRef.current);
      let thumbnailUrl = '';

      if (blob) {
        const fileName = `${crypto.randomUUID()}.png`;
        const { data: uploadRes, error: uploadError } = await supabase.storage
          .from('thumbnails')
          .upload(`examples/${fileName}`, blob, {
            cacheControl: '3600',
            contentType: 'image/png',
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: pub } = supabase.storage
          .from('thumbnails')
          .getPublicUrl(`examples/${fileName}`);

        thumbnailUrl = pub.publicUrl;
      }

      const { error } = await supabase.from('testdata').insert([
        {
          type: data.type,
          title: data.title,
          description: data.description,
          content: data.content,
          thumbnail: thumbnailUrl,
          tags,
        },
      ]);

      if (error) {
        toast.error(error.message || '저장 실패');
        return;
      }

      toast.success('예제 등록이 완료되었습니다.');
    } catch (error) {
      toast.error(error.message || '저장 실패');
    }
  };

  //다시 내 스타일로 작성하기
  const captureToBlob = async target => {
    if (!target) return;

    return await htmlToImage.toBlob(target, {
      backgroundColor: '#454545',
      pixelRatio: 2,
    });
  };

  return (
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
                    <FormLabel className="text-foreground">카테고리</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.type} value={category.type}>
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
                    <div ref={captureRef}>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>
          <FormSection>
            <div>
              <div className="mb-2 flex items-center gap-2 text-lg">
                <Tag size={18} className="text-primary" />
                태그
              </div>
              <Input
                placeholder="태그를 엔터로 구분하여 입력하세요"
                onKeyDown={e => handleKeyDown(e)}
              />
            </div>
            <div className="mt-3 flex gap-2">
              {tags.map((tag, index) => (
                // 중복 안되게, 삭제되게
                <Badge
                  key={index}
                  className="group relative cursor-pointer bg-purple-500/50 text-sm font-light text-white/80"
                  onClick={() => handleDeleteTag(tag)}
                >
                  {tag}
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100">
                    <X size={14} className="text-white" />
                  </div>
                </Badge>
              ))}
            </div>
          </FormSection>
        </div>
        <FormBtnGroup />
      </form>
    </Form>
  );
};

export default WriteForm;

try {
  const blob = await captureToBlob(captureRef.current);
  let thumbnailUrl = '';

  if (blob) {
    const fileName = `${crypto.randomUUID()}.png`;
    const { data: uploadRes, error: uploadError } = await supabase.storage
      .from('thumbnails')
      .upload(`examples/${fileName}`, blob, {
        cacheControl: '3600',
        contentType: 'image/png',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: pub } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(`examples/${fileName}`);

    thumbnailUrl = pub.publicUrl;
  }

  console.log('✅ 썸네일 업로드 성공:', thumbnailUrl);
} catch (error) {
  console.error('❌ 썸네일 업로드 실패:', error);
  toast.error('썸네일 업로드 실패: ' + error.message);
}
