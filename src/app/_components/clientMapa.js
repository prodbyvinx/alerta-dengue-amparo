'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  LoaderCircle,
} from 'lucide-react';

export default function ClientMap({ denuncias }) {
  const MapWithNoSSR = useMemo(() => dynamic(
    () => import('@/app/_components/mapaDenuncias'),
    {
      loading: () => <p><LoaderCircle className="animate-spin" /> Carregando mapa...</p>,
      ssr: false,
    }
  ), []);

  return <MapWithNoSSR denuncias={denuncias} />;
}