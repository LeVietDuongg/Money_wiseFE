'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const topPosts = [
  {
    id: 1,
    title: 'Món Ăn Truyền Thống Việt Nam',
    description: 'Đồ ăn siêu ngon và hấp dẫn, phục vụ nhanh chóng, không gian thoải mái, giá cả hợp lý. Sẽ quay lại!',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    author: 'Jone Sena',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    id: 2,
    title: 'Khám Phá Ẩm Thực Đường Phố',
    description: 'Như CC đừng ai ăn',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80',
    author: 'Sofia',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616c2f3e9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    id: 3,
    title: 'Bánh Mì Sài Gòn Truyền Thống',
    description: 'Bánh mì giòn tan, nhân đầy đặn với đủ loại rau củ tươi ngon. Một món ăn không thể bỏ qua khi đến Sài Gòn.',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1082&q=80',
    author: 'Anandranmyah',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
];

export default function TopPostsSection() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    // Sao nửa (nếu có)
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    // Sao rỗng
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }

    return stars;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Top 5 Bài viết
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              5 bài viết có lượt tương tác nhiều nhất từ
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <MdChevronLeft size={16} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <MdChevronRight size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPosts.map((post) => (
            <div key={post.id} className="group">
              {/* Post Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Author Info */}
              <div className="mb-3 flex items-center space-x-3">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">2 ngày trước</p>
                </div>
              </div>

              {/* Post Title */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(post.rating)}
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {post.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}