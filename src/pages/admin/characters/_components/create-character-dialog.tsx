import * as React from 'react';

import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { useCreateCharacterMutation } from '@/services/admin/characters.mutations';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CharacterGrade } from '@/types/models/character.model';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUploadImage } from '../hooks/use-upload-image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useApiError } from '@/hooks/use-api-error';
import { CharacterGradeBadge } from '@/components/character-grade-badge';

const createCharacterFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름은 최소 1자 이상' })
    .max(15, { message: '이름은 최대 15자 이하' }),
  description: z.string().min(1, { message: '설명은 최소 1자 이상' }),
  sell_price: z.number(),
});

type CreateCharacterFormValues = z.infer<typeof createCharacterFormSchema>;

interface CreateCharacterDialogProps {
  children: React.ReactNode;
}

export const CreateCharacterDialog = ({
  children,
}: CreateCharacterDialogProps) => {
  const { handleError } = useApiError();
  const [isOpen, setIsOpen] = React.useState(false);

  const [grade, setGrade] = React.useState<CharacterGrade>('Common');
  const { previewUrl, uploadImage, handleFileChange } = useUploadImage({
    initialUrl: '',
  });
  const form = useForm<CreateCharacterFormValues>({
    resolver: zodResolver(createCharacterFormSchema),
    defaultValues: {
      name: '',
      description: '',
      sell_price: 400,
    },
  });
  const { mutateAsync: createCharacter } = useCreateCharacterMutation();

  const handleSubmit = async (data: CreateCharacterFormValues) => {
    try {
      const imageUrl = await uploadImage();

      await createCharacter({
        body: { ...data, grade, image_url: imageUrl },
      });
      toast.success('성공적으로 캐릭터를 생성했습니다.');
      setIsOpen(false);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-full h-full max-w-mobile max-h-mobile">
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

            <CharacterGradeBadge grade={grade} className="mx-auto" />
            <div className={'w-full py-4 flex items-center gap-4'}>
              <div onClick={() => setGrade('Common')}>
                <CharacterGradeBadge grade="Common" />
              </div>
              <div onClick={() => setGrade('Rare')}>
                <CharacterGradeBadge grade="Rare" />
              </div>
              <div onClick={() => setGrade('Epic')}>
                <CharacterGradeBadge grade="Epic" />
              </div>
              <div onClick={() => setGrade('Legendary')}>
                <CharacterGradeBadge grade="Legendary" />
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
