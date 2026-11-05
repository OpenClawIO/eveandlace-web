import '../globals.css';
import { metadataFor } from '@/lib/metadata';
import { RootDocument } from '@/app/root-document';

export const metadata = metadataFor('es');

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
