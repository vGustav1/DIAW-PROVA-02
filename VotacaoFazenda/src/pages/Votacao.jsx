import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarForaDaRoca,
  listarNaRoca,
  registrarVoto,
} from '../service/votacaoService';

function Votacao() {
  const participantesNaRoca = listarNaRoca();
  const participantesForaDaRoca = listarForaDaRoca();
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos((quantidadeAtual) => quantidadeAtual + 1);
  }

  return (
    <main className="pagina votacao-pagina">
      <header className="pagina-cabecalho">
        <h1>Quem você quer eliminar?</h1>
        <p>Cada clique conta um voto para tirar o peão da fazenda.</p>
      </header>

      <section aria-label="Participantes na roça">
        <div className="grade-roca">
          {participantesNaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>
      </section>

      {ultimoVoto !== null && (
        <p className="aviso-voto" role="status" aria-live="polite">
          Seu voto foi registrado para <strong>{ultimoVoto.nome}</strong>. Você já
          votou {quantidadeVotos} {quantidadeVotos === 1 ? 'vez' : 'vezes'} nesta
          visita.{' '}
          <Link to="/resultado">Ver parcial da votação</Link>.
        </p>
      )}

      <section className="secao-fora-roca">
        <div className="secao-cabecalho">
          <h2>Demais peões</h2>
          <p>Fora da roça nesta semana, não podem receber votos.</p>
        </div>
        <div className="grade-fora">
          {participantesForaDaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;