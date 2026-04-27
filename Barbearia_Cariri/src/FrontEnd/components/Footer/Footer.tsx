import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-brand">
                    <h2>Barbearia Castelo Branco</h2>
                    <p>Tradição, estilo e excelência no Cariri.</p>
                </div>

                <div className="footer-info">
                    <p>📍 Av Castelo Branco 4455 - Novo Juazeiro</p>
                    <p>📞 (88) 99999-9999</p>
                    <p>✉️ contato@castelobranco.com</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2025 Barbearia Castelo Branco. Todos os direitos reservados.</p>
                <p className='footer-final'>Desenvolvido  por Lidyell Rocha</p>
            </div>
        </footer>
    )
}

export default Footer
