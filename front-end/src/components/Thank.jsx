import React from 'react'
import Lottie from 'react-lottie'
import bear from '../assets/animations/bear2.json'
import thanks from '../assets/animations/thanks.json'


const Thank = (props) => {

    return (
        <div style={{ width: '100%' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Lottie options={
                    {
                        loop: true,
                        autoplay: true,
                        animationData: thanks,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }
                }
                    isClickToPauseDisabled={false}
                    width={'50%'} />
            </div>

            <Lottie options={
                {
                    loop: true,
                    autoplay: true,
                    animationData: bear,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }
            }
                isClickToPauseDisabled={false}
                width={'100%'} />
        </div>
    )
}

export default Thank