import React from 'react'
import Lottie from 'react-lottie'
import wating from '../assets/animations/wating.json'

const Wating = () => {
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
                        animationData: wating,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }
                }
                    isClickToPauseDisabled={false}
                    width={'50%'} />
            </div>
        </div>
    )
}

export default Wating