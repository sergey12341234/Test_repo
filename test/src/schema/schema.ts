import z from 'zod';

export const schema = z.object({
  fromUserCountry: z.enum(['yes', 'no']).nullable().optional(),
  readyToCreate: z.enum(['yes', 'no']).nullable().optional(),
  image: z.instanceof(File).nullable().optional(),
});

export type FormData = z.infer<typeof schema>;