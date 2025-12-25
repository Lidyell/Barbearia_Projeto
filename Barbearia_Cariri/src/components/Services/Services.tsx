import './Services.css'

function Services1(){
    return(
        <section className='container-1'>
            <h1 className="titulo-services">Serviços</h1>
            <div className="bloco-services">
                <div className="item-service" id='Corte'>
                    <h2>Corte de Cabelo</h2> 
                    <p>R$ 30,00</p>
                </div>
                <div className="item-service" id='Barba'>
                    <h2>Barba</h2>
                    <p>R$ 20,00</p>
                </div>
                <div className="item-service" id='CorteBarba'>
                    <h2>Corte + Barba</h2>
                    <p>R$ 45,00</p>
                </div>
                <div className="item-service" id='CabeloInfantil'>
                    <h2>Cabelo Infantil</h2>
                    <p>R$ 25,00</p>
                </div>
                <div className="item-service" id='Sobrancelha'>
                    <h2>Sobrancelha</h2>
                    <p>R$ 20,00</p>
                </div>
                <div className="item-service" id='DescolorirCabelo'>
                    <h2>Descolorir cabelo</h2>
                    <p>R$ 50,00</p>
                </div>
            </div>

            
        </section>
    )

}

export default Services1