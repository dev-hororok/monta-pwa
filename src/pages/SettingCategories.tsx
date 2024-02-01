import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { useStudyCategoriesQuery } from '@/apis/queries/studyCategoryQueries';
import { PrevHeader } from '@/components/headers/PrevHeader';
import { CreateCategoryDialog } from '@/components/timer/CreateCategoryDialog';
import { EditCategoryDialog } from '@/components/timer/EditCategoryDialog';

export const SettingCategories = () => {
  const { data: currentMember } = useCurrentMemberQuery();
  const {
    data: categories,
    isPending,
    isError,
  } = useStudyCategoriesQuery(currentMember?.member_id);

  if (isPending) {
    return <div>loading...</div>;
  }
  if (!currentMember) {
    return <div>null member</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14 relative">
      <PrevHeader
        to="/"
        rightButton={
          <CreateCategoryDialog memberId={currentMember.member_id} />
        }
      />
      <div className="h-full py-4">
        <ul className="overflow-y-scroll scrollbar-hide">
          {categories.map((category) => {
            return (
              <EditCategoryDialog
                key={category.subject}
                memberId={currentMember.member_id}
                studyCategory={category}
              >
                <li className="w-full py-3 px-2 text-foreground border-b font-semibold text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  {category.subject}
                </li>
              </EditCategoryDialog>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
