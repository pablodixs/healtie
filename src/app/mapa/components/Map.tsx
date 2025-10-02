'use client'

import { AnimatePresence, motion } from 'motion/react'
import Map, { ScaleControl } from 'react-map-gl/mapbox'

import { css } from '../../../../styled-system/css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Paragraph } from '@/components/Typography/Paragraph'

import { establishments } from '@/utils/unidades.json'
import { Subheading } from '@/components/Typography/Subheading'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button'
import {
    ArrowUpRightIcon,
    GpsIcon,
    InfoIcon,
    MinusIcon,
    PlusIcon,
    XIcon,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { MapMarker } from '@/components/Map'
import { toolbarContainer } from '@/components/Map/styles'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
    longitude: -47.9292,
    latitude: -15.7801,
    zoom: 11,
}

export function MapComponent() {
    const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [isExpanded, setIsExpanded] = useState(false)

    const handleZoomIn = () => {
        if (mapRef.current) {
            mapRef.current.zoomIn()
        }
    }

    const handleZoomOut = () => {
        if (mapRef.current) {
            mapRef.current.zoomOut()
        }
    }

    return (
        <motion.section
            style={{
                width: '100%',
                height: '100%',
            }}
            initial={{ opacity: 0, filter: 'blur(2px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5 }}
        >
            {MAPBOX_TOKEN && (
                <main
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <motion.div
                        layout
                        transition={{
                            layout: {
                                type: 'spring',
                                stiffness: 170,
                                damping: 19,
                            },
                        }}
                        style={{
                            backdropFilter: 'blur(10px)',
                        }}
                        className={css({
                            zIndex: 1,
                            position: 'absolute',
                            top: 'header',
                            right: '1.5rem',
                            padding: isExpanded ? '1rem' : '0.25rem',
                            backgroundColor: isExpanded
                                ? 'rgba(255, 255, 255, 0.8)'
                                : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: isExpanded ? '24px' : '9999px',
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                            display: 'flex',
                            overflow: 'hidden',
                            alignItems: 'center',
                            transition: 'backgroundColor 0.2s ease',
                        })}
                    >
                        <AnimatePresence mode="popLayout">
                            {isExpanded ? (
                                <motion.div
                                    key="expanded-content"
                                    layout
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        filter: 'blur(6px)',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        filter: 'blur(6px)',
                                    }}
                                    className={css({
                                        display: 'flex',
                                        flexDir: 'column',
                                        alignItems: 'flex-start',
                                        maxWidth: '300px',
                                    })}
                                >
                                    <Button
                                        onClick={() => setIsExpanded(false)}
                                        iconButton
                                        variant="ghost"
                                    >
                                        <XIcon />
                                    </Button>
                                    <Paragraph bolder>
                                        Mapa de Unidades de Saúde
                                    </Paragraph>
                                    <Paragraph>
                                        Explore as unidades de saúde na sua
                                        região com nosso mapa interativo.
                                        Encontre facilmente clínicas, hospitais
                                        e postos de saúde próximos a você.
                                    </Paragraph>
                                    <Link href="/mapa" passHref>
                                        Saiba mais sobre o Mapa{' '}
                                        <ArrowUpRightIcon />
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="collapsed-buttons"
                                    layout
                                    initial={{
                                        opacity: 0,
                                        filter: 'blur(6px)',
                                        transition: { delay: 0.2 },
                                    }}
                                    animate={{
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        filter: 'blur(6px)',
                                    }}
                                >
                                    <Button
                                        iconButton
                                        variant="text"
                                        onClick={() => setIsExpanded(true)}
                                    >
                                        <InfoIcon size={18} weight="bold" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <div
                        style={{
                            backdropFilter: 'blur(10px)',
                        }}
                        className={toolbarContainer}
                    >
                        <Button variant="text" iconButton size="large">
                            <GpsIcon size={18} weight="bold" />
                        </Button>
                        <Button
                            variant="text"
                            iconButton
                            size="large"
                            onClick={handleZoomIn}
                        >
                            <PlusIcon size={18} weight="bold" />
                        </Button>
                        <Button
                            variant="text"
                            iconButton
                            size="large"
                            onClick={handleZoomOut}
                        >
                            <MinusIcon size={18} weight="bold" />
                        </Button>
                    </div>
                    <Map
                        ref={mapRef}
                        onError={(e) => {
                            console.error('Map error:', e.error)
                        }}
                        initialViewState={INITIAL_VIEW_STATE}
                        style={{
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                        }}
                        mapStyle="mapbox://styles/pablodixs/cmdrihemn00qs01s2dlgp3lp7"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                        {establishments
                            .filter(
                                (establishment) =>
                                    establishment.location &&
                                    typeof establishment.location.longitude ===
                                        'number' &&
                                    typeof establishment.location.latitude ===
                                        'number' &&
                                    !isNaN(establishment.location.longitude) &&
                                    !isNaN(establishment.location.latitude)
                            )
                            .map((establishment) => (
                                <MapMarker
                                    key={establishment.cnes}
                                    longitude={establishment.location.longitude}
                                    latitude={establishment.location.latitude}
                                    establishmentProps={establishment}
                                />
                            ))}
                        <ScaleControl />
                    </Map>
                </main>
            )}
            <div
                className={css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'background',
                    zIndex: -1,
                })}
            >
                {!MAPBOX_TOKEN && (
                    <>
                        <svg
                            width="86"
                            height="119"
                            viewBox="0 0 86 119"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginBottom: '1rem' }}
                        >
                            <path
                                d="M12.5961 53.7827C10.2879 56.9355 6.98738 61.3825 4.08542 65.1478C2.29009 67.4772 4.17718 71.1289 7.10949 70.9029L16.2885 70.1955C18.3522 70.0365 20.0336 71.8271 19.7451 73.8767L17.7007 88.4037C17.348 90.9096 19.8762 92.834 22.1977 91.8267L44.6858 82.0697C45.7306 81.6164 46.9368 81.745 47.8624 82.4086L63.5031 93.6208C65.7403 95.2246 68.8316 93.4838 68.6201 90.7392L67.3012 73.626C67.2116 72.4629 67.7542 71.3414 68.7219 70.69L81.9725 61.7693C84.2354 60.2458 83.717 56.7784 81.1074 55.9835L68.6445 52.187C66.9454 51.6694 65.98 49.88 66.4804 48.1757L70.6452 33.9917C71.429 31.3225 68.7054 28.9721 66.1796 30.138L54.2127 35.6619C52.841 36.295 51.2139 35.896 50.2908 34.7L40.3356 21.8022C38.582 19.5303 34.9585 20.4923 34.5629 23.3349L33.0072 34.513C32.7342 36.4741 30.7811 37.7337 28.882 37.1733L10.7851 31.8333C8.16399 31.0598 5.82198 33.6798 6.88324 36.1981L12.9624 50.6236C13.403 51.6691 13.2663 52.8673 12.5961 53.7827Z"
                                fill="#FD4E12"
                            />
                            <path
                                d="M55.5752 44.8039C51.6704 44.8039 48.5049 48.4891 48.5049 53.0347C48.5049 57.5804 51.6705 61.2653 55.5752 61.2654C59.4801 61.2654 62.6456 57.5804 62.6456 53.0347C62.6456 48.4891 59.4801 44.8039 55.5752 44.8039Z"
                                fill="white"
                            />
                            <path
                                d="M58.0585 48.6914C55.5251 48.6914 53.4714 51.0822 53.4714 54.0314C53.4714 56.9806 55.5251 59.3714 58.0585 59.3714C60.5919 59.3714 62.6456 56.9806 62.6456 54.0314C62.6456 51.0822 60.5919 48.6914 58.0585 48.6914Z"
                                fill="#202020"
                            />
                            <path
                                d="M37.3387 45.8005C33.4339 45.8006 30.2683 49.4857 30.2683 54.0314C30.2683 58.577 33.4339 62.262 37.3387 62.262C41.2435 62.262 44.409 58.577 44.4091 54.0314C44.4091 49.4857 41.2435 45.8005 37.3387 45.8005Z"
                                fill="white"
                            />
                            <path
                                d="M39.8219 49.6878C37.2885 49.6878 35.2348 52.0786 35.2348 55.0278C35.2348 57.977 37.2885 60.3678 39.8219 60.3678C42.3553 60.3678 44.4091 57.977 44.4091 55.0278C44.4091 52.0786 42.3553 49.6878 39.8219 49.6878Z"
                                fill="#202020"
                            />
                            <path
                                d="M48.8909 79.6069C49.5957 79.5471 50.297 79.7696 50.8518 80.2245C51.4058 80.6795 51.7681 81.3296 51.8473 82.0328C51.9186 82.6856 51.9834 83.3 52.0513 83.9403C52.9574 92.4724 53.8493 101.057 54.7888 109.55C54.8418 109.969 54.9493 110.279 55.0364 110.417C55.13 110.562 55.1474 110.526 55.183 110.533C55.2113 110.549 55.88 110.713 56.7764 110.55C56.9735 110.517 57.1763 110.475 57.3784 110.423C57.4806 110.397 57.5808 110.369 57.672 110.341C57.722 110.326 57.7631 110.312 57.8054 110.298C57.8229 110.292 57.8454 110.284 57.8592 110.278C57.8656 110.276 57.8724 110.273 57.8767 110.271C57.8775 110.271 57.8921 110.265 57.8499 110.279C58.7898 109.928 59.8208 109.97 60.7214 110.412C61.6217 110.853 62.3178 111.657 62.6514 112.633C62.9849 113.608 62.9272 114.67 62.4857 115.57C62.0444 116.47 61.2555 117.136 60.2976 117.434C59.2408 117.752 58.5519 117.857 57.6592 117.955C55.7757 118.116 53.4253 118.087 51.0876 116.488C48.7047 114.836 47.9097 112.035 47.8189 110.141C47.342 101.544 46.9206 92.9479 46.4826 84.378C46.4499 83.7425 46.4175 83.1002 46.385 82.4958C46.3448 81.7894 46.5924 81.0876 47.062 80.5458C47.5323 80.004 48.1861 79.6666 48.8909 79.6069Z"
                                fill="#FD4E12"
                            />
                            <path
                                d="M37.4578 77.4031C36.7502 77.4032 36.07 77.6844 35.5557 78.1847C35.042 78.6851 34.7362 79.3637 34.7169 80.0713C34.7011 80.7416 34.6885 81.3593 34.675 82.0187C34.4966 90.5853 34.3367 99.2064 34.1217 107.739C34.0715 108.662 33.8295 109.063 33.5012 109.353C33.1694 109.656 32.4173 109.998 31.4369 110.128C31.2319 110.156 31.0179 110.176 30.8074 110.187C30.7026 110.192 30.5954 110.194 30.5018 110.194C30.4481 110.194 30.4077 110.193 30.3624 110.192C30.3435 110.191 30.322 110.19 30.3074 110.189C30.3006 110.188 30.2947 110.188 30.2906 110.187C30.2921 110.187 30.2723 110.185 30.3234 110.187C29.3224 110.122 28.3473 110.46 27.6122 111.142C26.8771 111.824 26.4421 112.794 26.4035 113.824C26.365 114.853 26.7264 115.853 27.4085 116.588C28.0906 117.323 29.0376 117.733 30.0407 117.743C31.1906 117.742 31.877 117.635 32.7643 117.467C34.7295 117.061 36.9086 116.242 38.6842 114.373C40.4894 112.51 41.1733 109.805 41.0942 107.739C40.8468 99.142 40.5446 90.549 40.2608 81.9842C40.2396 81.3326 40.2175 80.6897 40.1988 80.0713C40.1794 79.3637 39.8737 78.6851 39.36 78.1847C38.8456 77.6844 38.1654 77.4031 37.4578 77.4031Z"
                                fill="#FD4E12"
                            />
                            <path
                                d="M34.2595 42.7364C34.4631 42.2786 34.9993 42.0725 35.4571 42.276C35.915 42.4796 36.1211 43.0158 35.9176 43.4737C35.1902 45.1103 33.7613 45.9668 32.2676 46.3875C30.7856 46.8049 29.1419 46.8261 27.7679 46.7324C27.268 46.6983 26.8903 46.2654 26.9244 45.7655C26.9585 45.2655 27.3913 44.8879 27.8913 44.9219C29.1788 45.0097 30.5839 44.9765 31.7756 44.6408C32.9556 44.3085 33.8255 43.713 34.2595 42.7364ZM53.2904 40.5729C54.1804 40.2673 55.166 40.1711 56.1996 40.4691C57.2269 40.7653 58.2215 41.428 59.1766 42.5025C59.5095 42.877 59.4759 43.4505 59.1014 43.7835C58.7269 44.1163 58.1534 44.0827 57.8205 43.7083C57.0335 42.8229 56.3174 42.3919 55.6967 42.2129C55.0824 42.0358 54.4824 42.0825 53.8798 42.2895C52.6151 42.7239 51.4471 43.818 50.4294 44.8358C50.075 45.1901 49.5007 45.1901 49.1463 44.8358C48.792 44.4814 48.792 43.9071 49.1463 43.5527C50.1247 42.5743 51.5699 41.1639 53.2904 40.5729Z"
                                fill="#202020"
                            />
                            <path
                                d="M64.487 60.8896C64.487 63.0946 60.912 64.882 56.5021 64.882C52.0923 64.882 48.5173 63.0946 48.5173 60.8896C48.5173 58.6847 52.0923 56.8972 56.5021 56.8972C60.912 56.8972 64.487 58.6847 64.487 60.8896Z"
                                fill="#FD4E12"
                            />
                            <path
                                d="M51.4293 63.7182C52.3031 63.5556 53.4433 63.5027 54.3406 64.1358C55.3638 64.8577 55.5763 66.0772 55.4007 67.3062C55.3015 68.0008 54.658 68.4833 53.9635 68.3841C53.2691 68.2848 52.7865 67.6416 52.8856 66.9472C52.9541 66.4679 52.8988 66.2717 52.8662 66.2075C52.8437 66.1966 52.7802 66.1709 52.6478 66.1589C52.4688 66.1428 52.2187 66.1555 51.8939 66.216C50.5396 66.4681 48.6975 67.3818 47.3738 68.2054C46.7781 68.5759 45.9949 68.3934 45.6242 67.7978C45.2536 67.2022 45.4362 66.4186 46.0319 66.048C47.4302 65.1779 49.5988 64.059 51.4293 63.7182Z"
                                fill="#202020"
                            />
                            <path
                                d="M65.5483 11.0507L62.6267 12.0548L61.4208 8.76037C63.6761 7.98528 64.5672 6.90942 64.0941 5.53279C63.9129 5.00557 63.6084 4.64355 63.1805 4.44674C62.7622 4.23024 62.2455 4.22769 61.6305 4.43908C60.6785 4.76623 59.8348 5.40824 59.0993 6.36512L58.065 3.35558C58.8028 2.64354 59.8527 2.05348 61.2147 1.58541C62.5913 1.1123 63.8301 1.09591 64.9312 1.53625C66.0272 1.96193 66.7866 2.78986 67.2094 4.02004C67.4359 4.67906 67.5104 5.3248 67.433 5.95726C67.3506 6.57508 67.1646 7.1057 66.8748 7.54914C66.5801 7.97793 66.27 8.3383 65.9446 8.63026C65.6192 8.92221 65.3027 9.12103 64.9952 9.22673L65.5483 11.0507ZM66.1324 13.036C66.6587 13.2809 67.0174 13.6816 67.2087 14.2381C67.3999 14.7946 67.3658 15.3385 67.1063 15.8698C66.8564 16.3814 66.4532 16.7329 65.8966 16.9241C65.3401 17.1154 64.7987 17.0886 64.2725 16.8437C63.7558 16.5792 63.4019 16.1686 63.2106 15.6121C63.0193 15.0556 63.0487 14.5215 63.2986 14.0099C63.5581 13.4786 63.9661 13.1173 64.5226 12.9261C65.0791 12.7348 65.6157 12.7715 66.1324 13.036Z"
                                fill="#C8C8C8"
                            />
                            <path
                                d="M77.4752 23.6354L75.803 22.67L76.8614 20.7497C78.1522 21.4949 79.0251 21.4736 79.48 20.6857C79.6542 20.384 79.6999 20.0919 79.6171 19.8094C79.5476 19.5233 79.3368 19.2787 78.9847 19.0755C78.4399 18.7609 77.791 18.6266 77.0381 18.6724L78.0326 16.95C78.671 17.0056 79.38 17.2585 80.1595 17.7085C80.9474 18.1634 81.4634 18.7408 81.7076 19.4405C81.9566 20.1319 81.8779 20.8297 81.4714 21.5337C81.2536 21.9109 80.9798 22.211 80.6498 22.434C80.3248 22.6487 79.9982 22.7787 79.6703 22.824C79.3472 22.861 79.0501 22.8627 78.7789 22.8291C78.5078 22.7955 78.2842 22.7278 78.1082 22.6262L77.4752 23.6354ZM76.7789 24.7253C76.8794 25.0739 76.8377 25.4075 76.6538 25.726C76.4699 26.0445 76.1994 26.2516 75.8425 26.3472C75.4987 26.4393 75.1676 26.3935 74.8491 26.2096C74.5306 26.0257 74.3211 25.7594 74.2206 25.4108C74.1333 25.0587 74.1816 24.7234 74.3655 24.4049C74.5494 24.0864 74.8132 23.881 75.157 23.7889C75.514 23.6933 75.8517 23.7374 76.1702 23.9213C76.4887 24.1052 76.6916 24.3732 76.7789 24.7253Z"
                                fill="#C8C8C8"
                            />
                        </svg>
                        <Subheading centered>
                            Recalculando a rota... do nosso mapa.
                        </Subheading>
                        <Paragraph centered subtle>
                            Estamos ajustando as bússolas e arrumando as ruas.
                            <br />
                            Tente novamente em alguns minutos!
                        </Paragraph>
                    </>
                )}
            </div>
        </motion.section>
    )
}
