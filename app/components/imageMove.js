'use client';
import { useRef } from 'react';
import Image from 'next/image';

export default function ImageMove({ image, alt, isMobile, translate }) {
    let imageRef = useRef(null);
    let mousePosition = useRef({ x: 0, y: 0 });
    let mouseEnterPosition = useRef({ x: 0, y: 0 });
    let mouseLeavePosition = useRef({ x: 0, y: 0 });
    let translateE = useRef({
        x: translate.x,
        y: translate.y,
        margin: translate.margin,
    });

    const handleMouseEnter = (e) => {
        mouseEnterPosition.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const handleMouseLeave = (e) => {
        setTimeout(() => {
            mouseLeavePosition.current = {
                x: e.clientX,
                y: e.clientY,
            };

            e.target.style.borderRadius = '20%';
            e.target.style.opacity = 0.6;
            e.target.style.transform = 'translate(0px, 0px)';
        }, 200);
    };

    const handleMouseMove = (e, mousePosition) => {
        let imagePosition = {
            topLeft: {
                x: imageRef.current.getBoundingClientRect().top,
                y: imageRef.current.getBoundingClientRect().left,
            },
            topRight: {
                x: imageRef.current.getBoundingClientRect().top,
                y: imageRef.current.getBoundingClientRect().right,
            },
            bottomLeft: {
                x: imageRef.current.getBoundingClientRect().bottom,
                y: imageRef.current.getBoundingClientRect().left,
            },
            bottomRight: {
                x: imageRef.current.getBoundingClientRect().bottom,
                y: imageRef.current.getBoundingClientRect().right,
            },
        };
        mousePosition.current = {
            x: e.clientX,
            y: e.clientY,
        };

        const moveImagex =
            Math.abs(mousePosition.current.x - imagePosition.topLeft.x) >
                Math.abs(translateE.current.x) + translateE.current.margin &&
            Math.abs(mousePosition.current.x - imagePosition.topRight.x) >
                Math.abs(translateE.current.x) + translateE.current.margin &&
            Math.abs(mousePosition.current.x - imagePosition.bottomLeft.x) >
                Math.abs(translateE.current.x) + translateE.current.margin &&
            Math.abs(mousePosition.current.x - imagePosition.bottomRight.x) >
                Math.abs(translateE.current.x) + translateE.current.margin;

        const moveImagey =
            Math.abs(mousePosition.current.y - imagePosition.topLeft.y) >
                Math.abs(translateE.current.y) + translateE.current.margin &&
            Math.abs(mousePosition.current.y - imagePosition.topRight.y) >
                Math.abs(translateE.current.y) + translateE.current.margin &&
            Math.abs(mousePosition.current.y - imagePosition.bottomLeft.y) >
                Math.abs(translateE.current.y) + translateE.current.margin &&
            Math.abs(mousePosition.current.y - imagePosition.bottomRight.y) >
                Math.abs(translateE.current.y) + translateE.current.margin;

        const moveImage = moveImagex && moveImagey;

        if (moveImage) {
            e.target.style.borderRadius = '10%';
            e.target.style.opacity = 1;
            e.target.style.transform = `translate(${translateE.current.x}px, ${translateE.current.y}px)`;
        }
    };

    return (
        <Image
            ref={imageRef}
            src={image}
            alt={alt}
            style={{
                borderRadius: '20%',
                opacity: 0.6,
                width: isMobile ? '300px' : '600px',
                height: isMobile ? '300px' : '600px',
                transition: 'all 0.5s ease-in-out',
            }}
            onMouseEnter={(e) => {
                handleMouseEnter(e);
            }}
            onMouseLeave={(e) => {
                handleMouseLeave(e);
            }}
            onMouseMove={(e) => {
                handleMouseMove(e, mousePosition);
            }}
        />
    );
}
