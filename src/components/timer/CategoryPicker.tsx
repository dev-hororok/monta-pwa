import useBoundStore from '@/stores/useBoundStore';
import { Badge } from '../ui/badge';
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
      <div className="flex items-center flex-wrap gap-3 overflow-x-scroll scrollbar-hide">
        <Badge
          onClick={() => setSelectedCategory(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="shrink-0 text-md"
        >
          선택 안함
        </Badge>
        {categories.map((category, idx) => {
          const isSelected = selectedCategory?.subject === category.subject;
          return (
            <Badge
              onClick={() => setSelectedCategory(category)}
              key={idx}
              variant={isSelected ? 'default' : 'outline'}
              className="shrink-0 text-md"
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
