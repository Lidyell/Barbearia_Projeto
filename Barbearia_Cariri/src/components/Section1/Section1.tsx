import "./Section1.css";

function Section1() {
  return (
    <section className="bloco">
      <div className="container_1">
        <div className="bloco_1">
          <h1>Bem-vindo à Barbearia Castelo Branco!</h1>
          <h3>
            Sua experiência de barbearia de confiança no coração do Cariri.
          </h3>
          <p>
            Na Barbearia Castelo Branco, oferecemos cortes de cabelo modernos,
            barbas bem cuidadas e um ambiente acolhedor para você relaxar. Nossa
            equipe de barbeiros experientes está pronta para proporcionar um
            atendimento personalizado, garantindo que você saia satisfeito e
            estiloso.
          </p>
          <br />
          <a href="#" className="btn-1">
            Agende seu horário
          </a>
        </div>
        <iframe
          className="Maps"
          src="https://www.google.com/maps/embed?pb=!4v1766135435614!6m8!1m7!1sWSDDHJM-qz6P_-NvdCH5PQ!2m2!1d-7.231126499392646!2d-39.28324984936312!3f19.381104383230564!4f1.7031035641905845!5f0.7820865974627469"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default Section1;
