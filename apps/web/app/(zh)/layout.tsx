import '../globals.css';
import { metadataFor } from '@/lib/metadata';
import { RootDocument } from '@/app/root-document';

export const metadata = metadataFor('zh');

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="zh">{children}</RootDocument>;
}
