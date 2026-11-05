import '../globals.css';
import { metadataFor } from '@/lib/metadata';
import { RootDocument } from '@/app/root-document';

export const metadata = metadataFor('en');

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
