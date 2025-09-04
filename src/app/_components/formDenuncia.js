'use client';
import { useState } from 'react';

export default function FormularioDenuncia() {
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch('/api/denuncias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude, descricao }),
        });

        if (res.ok) {
          setSuccess('Denúncia enviada com sucesso! Obrigado por colaborar.');
          setDescricao('');
          router.refresh();
        } else {
          setError('Falha ao enviar denúncia. Tente novamente.');
        }
      },
      () => {
        setError('Não foi possível obter sua localização. Por favor, habilite o serviço no seu navegador.');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="descricao" className="block mb-1">Descrição (opcional):</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ex: Pneu com água parada no terreno baldio."
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Reportar com Minha Localização Atual
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
}   