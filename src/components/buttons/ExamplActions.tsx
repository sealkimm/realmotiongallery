// // 파일 위치 매우 이상
// 'use client';

// import { useState } from 'react';
// import { Bookmark, Heart, MessageCircle } from 'lucide-react';

// import useExampleAction from '@/hooks/useExampleAction';

// interface ExampleActionsProps {
//   exampleId: string;
// }

// const ExampleActions = ({ exampleId }: ExampleActionsProps) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const { toggleLike, toggleBookmark, goToComment } = useExampleAction();

//   const onClickLike = async e => {
//     e.preventDefault();
//     e.stopPropagation();

//     const newState = await toggleLike(exampleId);
//     setIsLiked(newState);
//   };
//   return (
//     <div className="flex items-center justify-end gap-3">
//       {/*  중복.. 뭔가 똑똑한 방법이 있을까 */}
//       <button
//         type="button"
//         onClick={onClickLike}
//         className="flex items-center gap-1 p-1 text-gray-400 transition-colors hover:text-red-500"
//       >
//         <Heart size={16} />
//         <span className="text-sm">10</span>
//       </button>
//       <button
//         type="button"
//         // onClick={}
//         className="flex items-center gap-1 p-1 text-gray-400 transition-colors hover:text-blue-500"
//       >
//         <MessageCircle size={16} />
//         <span className="text-sm">24</span>
//       </button>
//       <button
//         type="button"
//         className="flex items-center gap-1 p-1 text-gray-400 transition-colors hover:text-yellow-500"
//       >
//         <Bookmark size={16} />
//       </button>
//     </div>
//   );
// };

// export default ExampleActions;
