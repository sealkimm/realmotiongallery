'use client';

import { useState } from 'react';
import {
  Edit,
  MessageCircle,
  MoreVertical,
  Trash,
  UserIcon,
} from 'lucide-react';

import { formatDate } from '@/lib/utils';
import DeleteConfirmDialog from '@/components/dialog/DeleteConfirmDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { CommentWithUser } from '../types/comment';
import CommentForm from './CommentForm';

interface CommentItemProps {
  comment: CommentWithUser;
  userId?: string;
  onUpdate: (commentId: string, content: string) => boolean;
  onDelete: (commentId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const CommentItem = ({
  comment,
  userId,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: CommentItemProps) => {
  const isAuthor = comment.author.id === userId;
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpdate = (content: string) => {
    const success = onUpdate(comment.id, content);
    if (!success) return;
    setIsEditMode(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div key={comment.id} className="relative flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={comment.author.avatar_url}
          alt={comment.author.nickname}
        />
        <AvatarFallback>
          <UserIcon size={16} />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {comment.author.nickname}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">
              {formatDate(comment.created_at)}
            </span>
          </div>
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 focus-visible:ring-0"
                  disabled={isUpdating || isDeleting}
                >
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-gray-800 bg-gray-900"
              >
                <DropdownMenuItem
                  onClick={() => setIsEditMode(true)}
                  className="cursor-pointer"
                >
                  <Edit size={14} className="mr-2" /> 수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                  className="cursor-pointer text-red-500"
                >
                  <Trash size={14} className="mr-2" /> 삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isEditMode ? (
          <CommentForm
            initialContent={comment.content}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditMode(false)}
            isLoading={isUpdating}
            isEditMode={isEditMode}
          />
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-300">{comment.content}</p>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="hover:text-gray-white text-xs text-gray-400"
              >
                <MessageCircle size={14} className="mr-1" />
                Reply
              </Button>
              {/* 답글 있는 경우 보여주도록 ,,,,,,영어 한글로 바꾸기*/}
              <Button
                variant="ghost"
                className="hover:text-gray-white text-xs text-gray-400"
              >
                View 20009405 replies
              </Button>
            </div>
          </>
        )}

        {/* <div>답급 버튼</div> */}
      </div>
      {/* 글작성 삭제는 해당 ui가 버튼 그룹에 있음.. 맞나?? 위치 둘 다 확인하기 */}
      <DeleteConfirmDialog
        type="comment"
        onDelete={handleDelete}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
export default CommentItem;
