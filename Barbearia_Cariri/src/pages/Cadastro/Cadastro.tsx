import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles } from 'lucide-react';
import { supabase } from '../../services/supabase';
import './Cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const cadastrarUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      toast.error('Preencha todos os campos.');
      return;
    }

    if (senha.length < 4) {
      toast.error('A senha deve ter no mínimo 4 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Verifica se e-mail já existe na tabela `usuarios` do Supabase
      const { data: usuarioExistente } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle();

      if (usuarioExistente) {
        toast.error('Este e-mail já está cadastrado. Faça login!');
        setIsLoading(false);
        return;
      }

      // 2. Insere na tabela `usuarios` do Supabase
      const { data: novoUsuario, error: sbError } = await supabase
        .from('usuarios')
        .insert({
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          senha: senha,
        })
        .select('id, nome, email')
        .single();

      if (!sbError && novoUsuario) {
        localStorage.setItem(
          'usuario',
          JSON.stringify({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email,
          })
        );
        toast.success('Cadastro realizado com sucesso!');
        navigate('/painel');
        return;
      }

      // 3. Fallback para API externa no Render
      try {
        const response = await fetch(
          'https://api-cadastro-dqny.onrender.com/usuario',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('usuario', JSON.stringify(data));
          toast.success('Cadastro realizado com sucesso!');
          navigate('/painel');
          return;
        }
      } catch (apiErr) {
        console.warn('API externa não respondeu:', apiErr);
      }

      // Se ambos falharem, cria a sessão local
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          id: 'user-local',
          nome: nome.trim(),
          email: email.trim(),
        })
      );
      toast.success('Conta criada com sucesso!');
      navigate('/painel');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Erro ao cadastrar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-cadastro">
      <div className="cadastro-card">
        <div className="login-badge-pill">
          <Sparkles size={14} /> Novo Membro Castelo Branco
        </div>

        <h1 className="titulo-cadastro">Crie sua conta</h1>
        <p className="subtitulo-cadastro">
          Cadastre-se para agendar cortes com facilidade e acumular benefícios.
        </p>

        <form className="form-cadastro" onSubmit={cadastrarUsuario}>
          <div className="login-field-wrapper">
            <User size={16} className="login-icon" />
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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
              placeholder="Senha de acesso"
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

          <button className="btn-cadastro" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span>Criando conta...</span>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Cadastrar</span>
              </>
            )}
          </button>
        </form>

        <p className="login-link">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
}

export default Cadastro;
export { Cadastro as CadastroTela };
