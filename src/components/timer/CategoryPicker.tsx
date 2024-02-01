import useBoundStore from '@/stores/useBoundStore';
import { Badge } from '../ui/badge';
import { CreateCategoryDialog } from './CreateCategoryDialog';
import { useStudyCategoriesQuery } from '@/apis/queries/studyCategoryQueries';

// const categories = ['공부', '코딩', '알고리즘', 'CS'];

interface Props {
  memberId: string;
}

const CategoryPicker = ({ memberId }: Props) => {
  const { data: categories, status, error } = useStudyCategoriesQuery(memberId);
  const selectedCategory = useBoundStore((state) => state.selectedCategory);
  const setSelectedCategory = useBoundStore(
    (state) => state.setSelectedCategory
  );
  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-full md:max-w-[368px] overflow-hidden">
      <div className="flex items-center flex-wrap gap-2 overflow-x-scroll scrollbar-hide">
        <CreateCategoryDialog memberId={memberId} />
        {categories.map((category, idx) => {
          const isSelected = selectedCategory === category.subject;
          return (
            <Badge
              onClick={() => setSelectedCategory(category.subject)}
              key={idx}
              variant={isSelected ? 'default' : 'outline'}
              className="shrink-0 cursor-pointer text-sm"
            >
              {category.subject}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPicker;
