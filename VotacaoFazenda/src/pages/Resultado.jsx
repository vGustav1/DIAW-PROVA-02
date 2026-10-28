import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  calcularTotalVotos,
  obterVotos,
  zerarVotos,
} from '../service/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(obterVotos);
  const totalVotos = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerarVotacao() {
    const confirmou = window.confirm('Tem certeza de que deseja zerar a votação?');
    if (confirmou) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina resultado-pagina">
      <header className="pagina-cabecalho">
        <h1>Parcial da eliminação</h1>
        <p className="total-votos">
          <strong>{totalVotos}</strong> votos computados
        </p>
      </header>

      {totalVotos === 0 ? (
        <section className="resultado-vazio" aria-live="polite">
          <h2>A votação ainda não começou</h2>
          <p>Seja o primeiro a escolher quem deve deixar a fazenda.</p>
          <Link className="botao botao-principal" to="/votacao">
            Ir para a votação
          </Link>
        </section>
      ) : (
        <>
          <ol className="placar" aria-label="Resultado da votação, do mais votado ao menos votado">
            {resultado.map((participante, indice) => {
              const percentualFormatado = participante.percentual.toLocaleString(
                'pt-BR',
                { maximumFractionDigits: 1 },
              );

              return (
                <li
                  className={'placar-item ' + (indice === 0 ? 'placar-lider' : '')}
                  key={participante.id}
                >
                  <img
                    className="placar-foto"
                    src={participante.foto}
                    alt={'Foto de ' + participante.nome}
                  />
                  <div className="placar-conteudo">
                    <div className="placar-nome-linha">
                      <h2>{participante.nome}</h2>
                      {indice === 0 && (
                        <span className="placar-selo">Sairia hoje</span>
                      )}
                    </div>
                    <div
                      className="barra"
                      role="progressbar"
                      aria-label={'Percentual de votos de ' + participante.nome}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={participante.percentual}
                    >
                      <div
                        className="barra-preenchida"
                        style={{ width: String(participante.percentual) + '%' }}
                      />
                    </div>
                    <p className="placar-detalhe">
                      {percentualFormatado}% ({participante.votos}{' '}
                      {participante.votos === 1 ? 'voto' : 'votos'})
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="resultado-acoes">
            <button
              className="botao botao-zerar"
              type="button"
              onClick={handleZerarVotacao}
            >
              Zerar votação
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Resultado;