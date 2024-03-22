import * as React from 'react';

import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useApiError } from '@/hooks/use-api-error';
import { useUploadImage } from '../../characters/hooks/use-upload-image';
import { ItemType } from '@/types/models/item.model';
import { useCreateItemMutation } from '@/services/admin/item.mutations';
import { Checkbox } from '@/components/ui/checkbox';

const createItemFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름은 최소 1자 이상' })
    .max(15, { message: '이름은 최대 15자 이하' }),
  description: z.string().min(1, { message: '설명은 최소 1자 이상' }),
  cost: z.coerce.number(),
  is_hidden: z.boolean(),
  required_study_time: z.coerce.number(),
  effect_code: z.coerce.number(),
});

type CreateItemFormValues = z.infer<typeof createItemFormSchema>;

interface CreateItemDialogProps {
  children: React.ReactNode;
}

export const CreateItemDialog = ({ children }: CreateItemDialogProps) => {
  const { handleError } = useApiError();
  const [isOpen, setIsOpen] = React.useState(false);

  const [itemType, setItemType] = React.useState<ItemType>('Food');
  const { previewUrl, uploadImage, handleFileChange } = useUploadImage({
    initialUrl: '',
  });
  const form = useForm<CreateItemFormValues>({
    resolver: zodResolver(createItemFormSchema),
    defaultValues: {
      name: '',
      description: '',
      cost: 400,
      is_hidden: false,
      required_study_time: 0,
      effect_code: 0,
    },
  });
  const { mutateAsync: createItem } = useCreateItemMutation();

  const handleSubmit = async (data: CreateItemFormValues) => {
    try {
      const imageUrl = await uploadImage();

      await createItem({
        body: { ...data, grade: '', image_url: imageUrl, item_type: itemType },
      });
      toast.success('성공적으로 아이템을 생성했습니다.');
      setIsOpen(false);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-full h-full max-w-mobile max-h-mobile overflow-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle>캐릭터 생성</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {previewUrl ? (
              <Avatar className="w-40 h-40 mx-auto rounded-sm">
                <AvatarImage alt="Preview" src={previewUrl} />
              </Avatar>
            ) : (
              <div className="w-40 h-40 mx-auto rounded-sm bg-gray-300"></div>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">이미지</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className={'w-full py-4 flex items-center gap-4'}>
              <Button
                variant={itemType === 'Food' ? 'default' : 'outline'}
                type="button"
                onClick={() => setItemType('Food')}
              >
                🐣
              </Button>
              <Button
                variant={itemType === 'Consumable' ? 'default' : 'outline'}
                type="button"
                onClick={() => setItemType('Consumable')}
              >
                🛠️
              </Button>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이름"
                      {...field}
                      className="h-12 mb-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="설명"
                      {...field}
                      className="h-12 mb-2"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가격</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="가격"
                      {...field}
                      className="h-12 mb-2"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="effect_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>효과 코드</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="효과"
                      {...field}
                      className="h-12 mb-2"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="required_study_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>먹이(초)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="먹이(초)"
                      {...field}
                      className="h-12 mb-2"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_hidden"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>파는거?</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-2">
              <Button
                onClick={() => setIsOpen(false)}
                type="button"
                variant={'ghost'}
                className="w-full h-12"
              >
                취소
              </Button>
              <Button type="submit" className="w-full h-12">
                생성
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
