import '../globals.css';
import { metadataFor } from '@/lib/metadata';
import { RootDocument } from '@/app/root-document';

export const metadata = metadataFor('ar');

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ar">{children}</RootDocument>;
}
