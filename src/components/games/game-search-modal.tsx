import Modal from "./trading-modal";
import GameStockNews from "./trading-stock-news-widget";
import GameStockInfo from "./games-stock-info";
import GameSmallChart from "./small-chart-widget";

type Props = {
    symbol: any;
    isModalOpen: any;
    setIsModalOpen: any;
    user: any;
    gameData: any;
};

export default function GameSearchModal({
    symbol,
    isModalOpen,
    setIsModalOpen,
    user,
    gameData
}: Props) {

    const closeModal = () => setIsModalOpen(false);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col h-[700px] pt-6">
                <div className="flex flex-row h-[700px]">
                    <div className="px-[20px]">
                        <GameSmallChart user={user} gameData={gameData} symbol={symbol} />
                    </div>
                    <div className="flex flex-col h-[650px] pr-[20px]">
                        <GameStockNews user={user} gameData={gameData} symbol={symbol} />
                        {/* <div className="h-[2px] bg-gray-600 w-full"></div> */}
                        <GameStockInfo user={user} gameData={gameData} symbol={symbol} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}