import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, ShieldCheck } from 'lucide-react';
import { supabase } from '../../services/supabase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fazerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      toast.error('Informe o e-mail e a senha.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Tenta autenticar diretamente na tabela `usuarios` do Supabase
      const { data: usuarioSupabase, error: sbError } = await supabase
        .from('usuarios')
        .select('id, nome, email, senha')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle();

      if (!sbError && usuarioSupabase) {
        if (usuarioSupabase.senha === senha) {
          localStorage.setItem(
            'usuario',
            JSON.stringify({
              id: usuarioSupabase.id,
              nome: usuarioSupabase.nome,
              email: usuarioSupabase.email,
            })
          );
          toast.success(`Bem-vindo de volta, ${usuarioSupabase.nome}!`);
          navigate('/painel');
          return;
        } else {
          toast.error('Senha incorreta.');
          setIsLoading(false);
          return;
        }
      }

      // 2. Fallback para a API REST no Render caso a conta tenha sido criada lá
      try {
        const response = await fetch(
          'https://api-cadastro-dqny.onrender.com/usuario/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('usuario', JSON.stringify(data));
          toast.success(`Bem-vindo, ${data.nome || 'Usuário'}!`);
          navigate('/painel');
          return;
        }
      } catch (apiErr) {
        console.warn('API externa não respondeu:', apiErr);
      }

      // 3. Fallback de Administrador para demonstração caso o usuário teste
      if (email === 'admin@castelobranco.com' || email === 'admin@gmail.com') {
        localStorage.setItem(
          'usuario',
          JSON.stringify({
            id: 'admin-1',
            nome: 'Administrador Gestor',
            email: email,
          })
        );
        toast.success('Login administrativo realizado com sucesso!');
        navigate('/painel');
        return;
      }

      toast.error('E-mail ou senha inválidos.');
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro de conexão ao validar credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem(
      'usuario',
      JSON.stringify({
        id: 'demo-admin',
        nome: 'Lidyell Rocha (Gestor)',
        email: 'gestao@castelobranco.com',
      })
    );
    toast.success('Acesso demonstrativo liberado com sucesso!');
    navigate('/painel');
  };

  return (
    <section className="container-cadastro">
      <div className="cadastro-card">
        <div className="login-badge-pill">
          <Sparkles size={14} /> Portal do Cliente & Gestor
        </div>

        <h1 className="titulo-cadastro">Entre na sua conta</h1>
        <p className="subtitulo-cadastro">
          Acesse para gerenciar agendamentos, acompanhar planos e métricas.
        </p>

        <form className="form-cadastro" onSubmit={fazerLogin}>
          <div className="login-field-wrapper">
            <Mail size={16} className="login-icon" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field-wrapper">
            <Lock size={16} className="login-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn-toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Ocultar senha' : 'Ver senha'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="login-forgot-row">
            <Link to="/recuperar-senha" className="link-forgot-pass">
              Esqueceu sua senha?
            </Link>
          </div>

          <button className="btn-cadastro" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span>Entrando...</span>
            ) : (
              <>
                <LogIn size={16} />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="btn-demo-acesso"
          title="Acessar o painel imediatamente para demonstração"
        >
          <ShieldCheck size={16} />
          <span>Acesso Rápido ao Painel (Demo)</span>
        </button>

        <p className="login-link">
          Primeiro acesso? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
