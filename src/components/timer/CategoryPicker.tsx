import useBoundStore from '@/stores/useBoundStore';
import { Badge } from '../ui/badge';

const categories = ['공부', '코딩', '알고리즘', 'CS'];

const CategoryPicker = () => {
  const selectedCategory = useBoundStore((state) => state.selectedCategory);
  const setSelectedCategory = useBoundStore(
    (state) => state.setSelectedCategory
  );
  return (
    <div className="w-full md:max-w-[368px] overflow-hidden">
      <div className="flex items-center gap-2 overflow-x-scroll scrollbar-hide">
        {categories.map((category, idx) => {
          const isSelected = selectedCategory === category;
          return (
            <Badge
              onClick={() => setSelectedCategory(category)}
              key={idx}
              variant={isSelected ? 'default' : 'outline'}
              className="shrink-0 cursor-pointer text-sm"
            >
              {category}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPicker;
