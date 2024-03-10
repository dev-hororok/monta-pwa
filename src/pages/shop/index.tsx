import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import { HomeHeader } from '@/components/headers/home-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FoodProductsSection } from './_components/food-products-section';
import { ToolProductsSection } from './_components/tool-products-section';

const ShopPage = () => {
  const { data: member, isPending, isError } = useCurrentMemberQuery();

  if (isPending) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
      <HomeHeader />
      <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
        <Tabs defaultValue="foods" className="w-full px-4 py-2 relative">
          <div className="sticky top-0 bg-background py-2">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="foods">재료</TabsTrigger>
              <TabsTrigger value="tools">사용 아이템</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="foods">
            <FoodProductsSection member={member} />
          </TabsContent>
          <TabsContent value="tools">
            <ToolProductsSection member={member} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ShopPage;
