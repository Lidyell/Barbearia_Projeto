-- ====================================================================
-- ESQUEMA DO BANCO DE DADOS - BARBEARIA CASTELO BRANCO (CARIRI)
-- Compatível com Supabase PostgreSQL + RLS + Práticas Recomendadas
-- ====================================================================

-- 1. TABELA: Barbeiros
CREATE TABLE IF NOT EXISTS public.barbeiros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    telefone TEXT,
    avatar_url TEXT,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA: Serviços (baseado nos serviços reais da Barbearia)
CREATE TABLE IF NOT EXISTS public.servicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
    duracao_minutos INTEGER NOT NULL DEFAULT 30,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABELA: Clientes
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT,
    telefone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABELA: Agendamentos
CREATE TABLE IF NOT EXISTS public.agendamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
    barbeiro_id UUID NOT NULL REFERENCES public.barbeiros(id) ON DELETE RESTRICT,
    servico_id UUID NOT NULL REFERENCES public.servicos(id) ON DELETE RESTRICT,
    data_hora TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pendente', 'confirmado', 'concluido', 'cancelado')),
    observacoes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TABELA: Pagamentos
CREATE TABLE IF NOT EXISTS public.pagamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agendamento_id UUID NOT NULL REFERENCES public.agendamentos(id) ON DELETE CASCADE,
    valor NUMERIC(10,2) NOT NULL CHECK (valor >= 0),
    metodo_pagamento TEXT NOT NULL CHECK (metodo_pagamento IN ('pix', 'cartao_credito', 'cartao_debito', 'dinheiro')),
    status TEXT NOT NULL CHECK (status IN ('pago', 'pendente', 'estornado')),
    data_pagamento TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. TABELA: Metas Mensais
CREATE TABLE IF NOT EXISTS public.metas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barbeiro_id UUID REFERENCES public.barbeiros(id) ON DELETE CASCADE,
    mes_ano DATE NOT NULL,
    valor_meta NUMERIC(10,2) NOT NULL CHECK (valor_meta > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================================================================
-- ÍNDICES PARA PERFORMANCE (Supabase Best Practices)
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_agendamentos_cliente_id ON public.agendamentos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_barbeiro_id ON public.agendamentos(barbeiro_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_servico_id ON public.agendamentos(servico_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data_hora ON public.agendamentos(data_hora);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON public.agendamentos(status);

CREATE INDEX IF NOT EXISTS idx_pagamentos_agendamento_id ON public.pagamentos(agendamento_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_data_pagamento ON public.pagamentos(data_pagamento);
CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON public.pagamentos(status);

CREATE INDEX IF NOT EXISTS idx_metas_mes_ano ON public.metas(mes_ano);
CREATE INDEX IF NOT EXISTS idx_metas_barbeiro_id ON public.metas(barbeiro_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================================================
ALTER TABLE public.barbeiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;

-- Políticas para acesso público e autenticado via Data API
DROP POLICY IF EXISTS "Permitir leitura publica de barbeiros" ON public.barbeiros;
CREATE POLICY "Permitir leitura publica de barbeiros" ON public.barbeiros FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Permitir gerenciamento de barbeiros" ON public.barbeiros;
CREATE POLICY "Permitir gerenciamento de barbeiros" ON public.barbeiros FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura publica de servicos" ON public.servicos;
CREATE POLICY "Permitir leitura publica de servicos" ON public.servicos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Permitir gerenciamento de servicos" ON public.servicos;
CREATE POLICY "Permitir gerenciamento de servicos" ON public.servicos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura de clientes" ON public.clientes;
CREATE POLICY "Permitir leitura de clientes" ON public.clientes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Permitir cadastro de clientes" ON public.clientes;
CREATE POLICY "Permitir cadastro de clientes" ON public.clientes FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir atualizacao de clientes" ON public.clientes;
CREATE POLICY "Permitir atualizacao de clientes" ON public.clientes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura de agendamentos" ON public.agendamentos;
CREATE POLICY "Permitir leitura de agendamentos" ON public.agendamentos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Permitir criacao de agendamentos" ON public.agendamentos;
CREATE POLICY "Permitir criacao de agendamentos" ON public.agendamentos FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir edicao de agendamentos" ON public.agendamentos;
CREATE POLICY "Permitir edicao de agendamentos" ON public.agendamentos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura de pagamentos" ON public.pagamentos;
CREATE POLICY "Permitir leitura de pagamentos" ON public.pagamentos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Permitir criacao de pagamentos" ON public.pagamentos;
CREATE POLICY "Permitir criacao de pagamentos" ON public.pagamentos FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir atualizacao de pagamentos" ON public.pagamentos;
CREATE POLICY "Permitir atualizacao de pagamentos" ON public.pagamentos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura de metas" ON public.metas;
CREATE POLICY "Permitir leitura de metas" ON public.metas FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Permitir gerenciamento de metas" ON public.metas;
CREATE POLICY "Permitir gerenciamento de metas" ON public.metas FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ====================================================================
-- DADOS INICIAIS (SEED) - BARBEARIA CASTELO BRANCO
-- ====================================================================

-- Barbeiros (UUIDs hexadecimais válidos)
INSERT INTO public.barbeiros (id, nome, email, telefone, ativo) VALUES
('b1111111-1111-1111-1111-111111111111', 'João Silva', 'joao.silva@castelobranco.com', '(88) 99811-1001', true),
('b2222222-2222-2222-2222-222222222222', 'Pedro Rocha', 'pedro.rocha@castelobranco.com', '(88) 99822-2002', true),
('b3333333-3333-3333-3333-333333333333', 'Carlos Lima', 'carlos.lima@castelobranco.com', '(88) 99833-3003', true),
('b4444444-4444-4444-4444-444444444444', 'Maria Oliveira', 'maria.oliveira@castelobranco.com', '(88) 99844-4004', true)
ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome, ativo = EXCLUDED.ativo;

-- Serviços (UUIDs hexadecimais válidos iniciados por 'a')
INSERT INTO public.servicos (id, nome, preco, duracao_minutos, ativo) VALUES
('a1111111-1111-1111-1111-111111111111', 'Corte de Cabelo', 30.00, 30, true),
('a2222222-2222-2222-2222-222222222222', 'Barba', 20.00, 30, true),
('a3333333-3333-3333-3333-333333333333', 'Corte + Barba', 45.00, 50, true),
('a4444444-4444-4444-4444-444444444444', 'Cabelo Infantil', 25.00, 30, true),
('a5555555-5555-5555-5555-555555555555', 'Sobrancelha', 20.00, 15, true),
('a6666666-6666-6666-6666-666666666666', 'Descolorir Cabelo', 50.00, 60, true)
ON CONFLICT (id) DO UPDATE SET preco = EXCLUDED.preco, nome = EXCLUDED.nome;

-- Clientes (UUIDs hexadecimais válidos iniciados por 'c')
INSERT INTO public.clientes (id, nome, email, telefone) VALUES
('c1111111-1111-1111-1111-111111111111', 'Lucas Mendes', 'lucas.mendes@gmail.com', '(88) 99111-2233'),
('c2222222-2222-2222-2222-222222222222', 'Gabriel Ferreira', 'gabriel.f@gmail.com', '(88) 99222-3344'),
('c3333333-3333-3333-3333-333333333333', 'Rodrigo Santana', 'rodrigo.s@gmail.com', '(88) 99333-4455'),
('c4444444-4444-4444-4444-444444444444', 'Matheus Costa', 'matheus.c@gmail.com', '(88) 99444-5566'),
('c5555555-5555-5555-5555-555555555555', 'Felipe Araújo', 'felipe.a@gmail.com', '(88) 99555-6677'),
('c6666666-6666-6666-6666-666666666666', 'André Souza', 'andre.souza@gmail.com', '(88) 99666-7788')
ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome;

-- Metas
DELETE FROM public.metas WHERE mes_ano = date_trunc('month', CURRENT_DATE)::date;
INSERT INTO public.metas (barbeiro_id, mes_ano, valor_meta) VALUES
(NULL, date_trunc('month', CURRENT_DATE)::date, 12000.00),
('b1111111-1111-1111-1111-111111111111', date_trunc('month', CURRENT_DATE)::date, 3500.00),
('b2222222-2222-2222-2222-222222222222', date_trunc('month', CURRENT_DATE)::date, 3200.00),
('b3333333-3333-3333-3333-333333333333', date_trunc('month', CURRENT_DATE)::date, 2800.00),
('b4444444-4444-4444-4444-444444444444', date_trunc('month', CURRENT_DATE)::date, 2500.00);

-- Agendamentos e Pagamentos Históricos (últimos 28 dias até hoje)
DO $$
DECLARE
    b_ids UUID[] := ARRAY[
        'b1111111-1111-1111-1111-111111111111'::UUID,
        'b2222222-2222-2222-2222-222222222222'::UUID,
        'b3333333-3333-3333-3333-333333333333'::UUID,
        'b4444444-4444-4444-4444-444444444444'::UUID
    ];
    s_ids UUID[] := ARRAY[
        'a1111111-1111-1111-1111-111111111111'::UUID,
        'a2222222-2222-2222-2222-222222222222'::UUID,
        'a3333333-3333-3333-3333-333333333333'::UUID,
        'a4444444-4444-4444-4444-444444444444'::UUID,
        'a5555555-5555-5555-5555-555555555555'::UUID,
        'a6666666-6666-6666-6666-666666666666'::UUID
    ];
    s_prices NUMERIC[] := ARRAY[30.00, 20.00, 45.00, 25.00, 20.00, 50.00];
    c_ids UUID[] := ARRAY[
        'c1111111-1111-1111-1111-111111111111'::UUID,
        'c2222222-2222-2222-2222-222222222222'::UUID,
        'c3333333-3333-3333-3333-333333333333'::UUID,
        'c4444444-4444-4444-4444-444444444444'::UUID,
        'c5555555-5555-5555-5555-555555555555'::UUID,
        'c6666666-6666-6666-6666-666666666666'::UUID
    ];
    pay_methods TEXT[] := ARRAY['pix', 'cartao_credito', 'cartao_debito', 'dinheiro'];
    d INTEGER;
    h INTEGER;
    b_idx INTEGER;
    s_idx INTEGER;
    c_idx INTEGER;
    p_idx INTEGER;
    ag_id UUID;
    ag_status TEXT;
    ag_time TIMESTAMPTZ;
BEGIN
    DELETE FROM public.agendamentos WHERE observacoes = 'seed-automatico';

    FOR d IN 0..28 LOOP
        FOR h IN 9..18 BY 2 LOOP
            b_idx := 1 + ((d + h) % 4);
            s_idx := 1 + ((d * 2 + h) % 6);
            c_idx := 1 + ((d * 3 + h) % 6);
            p_idx := 1 + ((d + h) % 4);
            
            ag_time := (CURRENT_DATE - d) + (h || ' hours')::interval;

            IF d > 0 THEN
                IF (d + h) % 11 = 0 THEN
                    ag_status := 'cancelado';
                ELSE
                    ag_status := 'concluido';
                END IF;
            ELSE
                IF h <= 13 THEN
                    ag_status := 'concluido';
                ELSE
                    ag_status := 'confirmado';
                END IF;
            END IF;

            ag_id := gen_random_uuid();

            INSERT INTO public.agendamentos (id, cliente_id, barbeiro_id, servico_id, data_hora, status, observacoes)
            VALUES (ag_id, c_ids[c_idx], b_ids[b_idx], s_ids[s_idx], ag_time, ag_status, 'seed-automatico');

            IF ag_status = 'concluido' THEN
                INSERT INTO public.pagamentos (agendamento_id, valor, metodo_pagamento, status, data_pagamento)
                VALUES (ag_id, s_prices[s_idx], pay_methods[p_idx], 'pago', ag_time + interval '30 minutes');
            END IF;
        END LOOP;
    END LOOP;
END $$;
