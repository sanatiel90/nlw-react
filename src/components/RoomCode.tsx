import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeType = {
    code: string;
}

export function RoomCode(props: RoomCodeType) {

    function copyRoomCopyToClipboard(){
        navigator.clipboard.writeText(props.code); //api do navegador que permite copiar algum texto para a área de transferencia (clipboard)
    }

    return (
        <button className="room-code" onClick={copyRoomCopyToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}