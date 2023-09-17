import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Logo from '../assets/Logo.png';
import Cabelo from '../assets/cabelo.jpeg';

export default function Home(){
    return(
    <div className="home">
        <header className="header">
        <img src={Logo} alt="Logo da Empresa" />
            <nav className="menu">
                <Link className='LK' to="/loginsalao">Login_Salão</Link>
                <Link className='LK' to="/registrosalao">Registrar_Salão</Link>
            </nav>
        </header>
        <div className="content">
            <div className="promo-text">
                <div id='Primary'>
                    <h1>Bem-vindo nosso Sistema de  Salão de Beleza!</h1>
                    <p>Prucure o salão mais perto de sua região e faça seu agendamento atraves da nossa plataforma.</p>
                </div>
                <br/>
                <br/>
                <div id='Doublediv'>
                    <div id='porque'>
                        <h2>Por que escolher o nosso sistema de agendamento?</h2>
                        <br/>
                        <p>
                        <strong>Facilidade de Uso:</strong> Com apenas alguns cliques, você pode escolher os tratamentos que deseja e agendar no horário que mais lhe convém. Nossa interface simples e amigável torna o processo de agendamento um verdadeiro prazer.
                        <br/><strong>Agendamento 24/7:</strong> Não importa se é dia ou noite, você pode fazer seu agendamento a qualquer hora do dia ou da noite. Não estamos limitados ao horário comercial. A sua conveniência é a nossa prioridade.
                        <br/><strong>Controle Total:</strong> Visualize todos os serviços disponíveis, escolha os profissionais que deseja e selecione o horário que melhor se ajusta à sua agenda. Você está no controle completo do seu agendamento.
                        <br/><strong>Personalização:</strong> Personalize seus tratamentos de acordo com suas preferências. Escolha os produtos, horários e serviços que atendam às suas necessidades individuais.
                        </p>
                    </div>
                    <div id='juntese-nos'>
                        <h2>Por que escolher o nosso sistema de agendamento?</h2>
                        <br/>
                        <p>  
                            <strong>Visibilidade Ampliada:</strong> Ao se cadastrar em nossa plataforma, seu salão ganhará visibilidade para um público mais amplo, permitindo que novos clientes o encontrem facilmente.
                            <br/><strong>Agendamento Online:</strong> Oferecemos uma solução conveniente de agendamento online, simplificando o processo tanto para você quanto para seus clientes.
                            <br/><strong>Gestão Eficiente:</strong> Nosso sistema de gerenciamento de salão facilita o acompanhamento de horários, reservas e histórico do cliente, tornando a administração do salão mais eficiente.
                            <br/><strong>Avaliações e Feedback:</strong> Os clientes podem deixar avaliações e feedback, ajudando você a construir uma reputação sólida e confiável.
                            <br/><strong>Promoções Personalizadas:</strong> Use nossa plataforma para criar e promover ofertas e promoções especiais, atraindo mais clientes e aumentando suas vendas.
                            <br/><strong>Suporte Dedicado:</strong> Conte com nossa equipe de suporte dedicada para ajudar a resolver qualquer dúvida ou problema que você possa enfrentar.
                            </p>
                    </div>
                </div>
                <br/>
                <div id='Saloes'>
                     <h2>Vejá os Saloẽs Registrados em nossa plataforma</h2>
                     <br/>
                    <div id='img'>
                        <img src={Cabelo} alt='cabelo'/>
                        <br/>
                        <p>Clique aqui e vejá nossos saloẽs parceiros, e agende seu Horário
                            <br/><a href='/init'>Saloẽs Parseiros</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <footer>
        <div class="contact">
            <p>Contate-nos pelos canais de atendimento</p>
            <br/>
            <a href="mailto:seu-email@exemplo.com">
            <img src="caminho-para-o-icone-email.png" alt="Email" />
            </a>
            <a href="tel:+1234567890">
            <img src="caminho-para-o-icone-telefone.png" alt="Telefone" />
            </a>
        </div>
        </footer>
    </div>
    );    
}