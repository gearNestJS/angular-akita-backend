import slugify from 'slugify';

export function generateSlug(title: string): string {
  const slugifyProps = {
    trim: true,
    lower: true,
    replacement: '-',
  };
  return slugify(title, slugifyProps);
}
