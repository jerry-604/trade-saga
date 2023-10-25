import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { CreateGameStepOne } from '../components/create-game/create-game-step-one'
import { CreateGameStepTwo } from '../components/create-game/create-game-step-two'
import { CreateGameStepThree } from '../components/create-game/create-game-step-three'
import { CreateGameStepFour } from '../components/create-game/create-game-step-four'
import { trpc } from "../utils/trpc";
export default function Create() {
    const [gameTitle, setGameTitle] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("create-background");
    const [step, setStep] = useState(0);
    const [startDate, setStartDate] = useState<null | string>(null);
    const [endDate, setEndDate] = useState(null);
    const [shareID, setShareID] = useState(guidGenerator());
    const { push, replace } = useRouter();
    const { mutate, isLoading } = trpc.gameRouter.createGame.useMutation({
        onSuccess: (response) => {
            replace(`/games/${response.shareId}`, undefined, {
                shallow: true,
              });
        },
      });


    const createGame = () => {
        console.log(typeof startDate);
        if(startDate != null && endDate != null) {
        let formatedStart = new Date(startDate);
        let formatedEnd = new Date(endDate ?? "");
        
        mutate({
            gameTitle: gameTitle,
            backgroundImage: backgroundImage,
            startDate: formatedStart,
            endDate: formatedEnd,
            shareId: shareID,
        })

        }
    }
    return (
        <div className="min-h-screen flex bg-[#F5F5F5]">
            <div className="flex-1 bg-white p-4">
                {(() => {
                    switch (step) {
                        case 0:
                            return <CreateGameStepOne gameTitle={gameTitle} setGameTitle={setGameTitle} 
                            backgroundImage={backgroundImage} setBackgroundImage={setBackgroundImage} setStep={setStep}/>
                        case 1:
                            return <CreateGameStepTwo startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} 
                           setStep={setStep}/>
                        case 2:
                            return <CreateGameStepThree shareID={shareID} setStep={setStep}/>
                        case 3:
                            return <CreateGameStepFour gameTitle={gameTitle} startDate={startDate} endDate={endDate} shareID={shareID} setStep={setStep} createGame={createGame}/>
                        default:
                            return null
                    }
                })()}
            </div>

            <div className={`flex-1 ${backgroundImage == 'create-background' ? 'mix-blend-color-burn' : null} bg-[url('/${backgroundImage}.png')] bg-cover bg-no-repeat bg-left p-4`}></div>
        </div>
    );

    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4());
    }
}

