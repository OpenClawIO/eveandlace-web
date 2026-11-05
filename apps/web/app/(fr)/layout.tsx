import '../globals.css';
import { metadataFor } from '@/lib/metadata';
import { RootDocument } from '@/app/root-document';

export const metadata = metadataFor('fr');

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="fr">{children}</RootDocument>;
}
