import { Badge } from '@/components/ui/badge';
import { useStudyCategoriesQuery } from '@/apis/queries/studyCategoryQueries';
import { IStudyCategory } from '@/models/study.model';
import { useTimerStateStore } from '@/stores/timer-state-store';

// const categories = ['공부', '코딩', '알고리즘', 'CS'];

interface Props {
  memberId: string;
}

const CategoryPicker = ({ memberId }: Props) => {
  const { data: categories, status, error } = useStudyCategoriesQuery(memberId);

  const selectedCategory = useTimerStateStore(
    (state) => state.selectedCategory
  );
  const setSelectedCategory = useTimerStateStore(
    (state) => state.setSelectedCategory
  );

  const updateStudyCategory = (category: IStudyCategory | null) => {
    setSelectedCategory(category);
  };

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
          onClick={() => updateStudyCategory(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="shrink-0 text-md"
        >
          선택 안함
        </Badge>
        {categories.map((category, idx) => {
          const isSelected = selectedCategory?.subject === category.subject;
          return (
            <Badge
              onClick={() => updateStudyCategory(category)}
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
