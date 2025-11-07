export interface Category {
  id: number;
  type: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  borderColor: string;
}

export const categories: Category[] = [
  {
    id: 1,
    type: 'gsap',
    title: 'GSAP',
    description:
      'GSAP는 애니메이션 GSAP는 애니메이션 GSAP는 애니메이션 GSAP는 애니메이션',
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500',
  },
  {
    id: 2,
    type: 'threejs',
    title: 'Three.js',
    description: 'Immersive 3D experiences and animations',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
  },
  {
    id: 3,
    type: 'css',
    title: 'CSS',
    description: 'Pure CSS animations and transitions',
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
  },
  {
    id: 4,
    type: 'other',
    title: 'Other',
    description: 'Other categories',
    color: 'from-gray-500 to-gray-500',
    textColor: 'text-gray-500',
    borderColor: 'border-gray-500',
  },
];
