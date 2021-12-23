import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
    return (
        <div id='page-home'>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salar de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audidência em tempo-real</p>
            </aside>
            <main>
                <div>
                    <img src={logoImg} alt="Logo" />
                    <button>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com Google
                    </button>
                    <div>ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                        />
                        <button type='submit'>
                            Entrar a sala
                        </button>
                    </form>
                </div>
            </main>

        </div>
    )
}