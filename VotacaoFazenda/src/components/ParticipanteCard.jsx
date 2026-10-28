function ParticipanteCard({ participante, onVotar }) {
  return (
    <article
      className={'card participante-card ' + (participante.naRoca ? 'card-roca' : 'card-fora')}
    >
      {participante.naRoca && <span className="card-selo">Na roça</span>}

      <img
        className="card-foto"
        src={participante.foto}
        alt={'Foto de ' + participante.nome}
        loading="lazy"
      />

      <div className="card-corpo">
        <h3>{participante.nome}</h3>
        {onVotar && (
          <button
            className="botao botao-principal card-botao"
            type="button"
            onClick={() => onVotar(participante)}
          >
            Votar para eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default ParticipanteCard;