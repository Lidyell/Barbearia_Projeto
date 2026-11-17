import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import './RecuperarSenha.css';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Informe o seu e-mail cadastrado.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEnviado(true);
      toast.success('Instruções de redefinição enviadas para seu e-mail!');
    }, 800);
  };

  return (
    <section className="container-recuperar">
      <div className="recuperar-card">
        <div className="login-badge-pill">
          <Sparkles size={14} /> Segurança & Acesso
        </div>

        {enviado ? (
          <div className="recuperar-sucesso-box">
            <div className="sucesso-icon-circle">
              <CheckCircle2 size={36} className="text-gold" />
            </div>
            <h2 className="recuperar-title">E-mail Enviado!</h2>
            <p className="recuperar-subtitle">
              Enviamos um link seguro de recuperação para <strong>{email}</strong>.
              Verifique sua caixa de entrada e pasta de spam.
            </p>
            <Link to="/login" className="btn-dourado-principal btn-voltar-login">
              <ArrowLeft size={16} />
              <span>Voltar para o Login</span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="recuperar-title">Recuperar Senha</h1>
            <p className="recuperar-subtitle">
              Digite o e-mail associado à sua conta. Enviaremos um link seguro para
              você redefinir sua senha.
            </p>

            <form className="recuperar-form" onSubmit={handleSubmit}>
              <div className="login-field-wrapper">
                <Mail size={16} className="login-icon" />
                <input
                  type="email"
                  placeholder="Seu e-mail cadastrado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-dourado-principal btn-recuperar-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Enviando link...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Enviar Link de Recuperação</span>
                  </>
                )}
              </button>
            </form>

            <div className="recuperar-footer-link">
              <Link to="/login" className="link-voltar">
                <ArrowLeft size={14} />
                <span>Lembrou da senha? Voltar ao Login</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
