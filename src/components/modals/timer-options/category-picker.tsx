import { Badge } from '@/components/ui/badge';
import { useStudyCategoriesQuery } from '@/apis/queries/study-category-queries';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

interface Props {
  memberId: string;
}

const CategoryPicker = ({ memberId }: Props) => {
  const { data: categories, status, error } = useStudyCategoriesQuery(memberId);

  const selectedCategory = useTimerOptionsStore(
    (state) => state.selectedCategory
  );
  const setTimerOptions = useTimerOptionsStore(
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
          onClick={() => setTimerOptions(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="shrink-0 text-md"
        >
          선택 안함
        </Badge>
        {categories.map((category, idx) => {
          const isSelected = selectedCategory?.subject === category.subject;
          return (
            <Badge
              onClick={() => setTimerOptions(category)}
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
