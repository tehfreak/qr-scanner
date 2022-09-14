import React from 'react'
import './Scanner.css'

import QrScanner from 'qr-scanner'

export default function Scanner() {

    const videoRef = React.useRef(null)
    const overlayRef = React.useRef(null)

    const [ ready, setReady ] = React.useState(false)
    const [ error, setError ] = React.useState(null)

    const [ data, setData ] = React.useState(null)

    React.useEffect(() => {
        const qrScanner = new QrScanner(
            videoRef.current,
            (result) => {
                if (result.data) {
                    setData(result.data)
                }
            },
            {
                preferredCamera: 'environment',
                highlightCodeOutline: true,
                maxScansPerSecond: 5,
                overlay: overlayRef.current,
                calculateScanRegion: (video) => ({
                    x: 0,
                    y: 0,
                    width: video.videoWidth,
                    height: video.videoHeight,
                    downScaledHeight: 0,
                    downScaledWidth: 0,
                })
            }
        )
        qrScanner.start()
            .catch((error) => {
                console.log('scanner error', error)
                setError(error)
            })
            .then(() => {
                setReady(true)
            })
        ;
        return () => {
            qrScanner.destroy()
        }
    }, [])

    return (
        <div className="Scanner">
            <video className="Scanner-video" ref={videoRef}/>
            <div className="Scanner-overlay" ref={overlayRef}/>
            {data && (
                <div className="Scanner-result">
                    {JSON.stringify(data)}
                </div>
            )}
        </div>
    )
}
