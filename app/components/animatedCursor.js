import { Fragment, useEffect, useRef, useState, useCallback } from 'react';

function useEventListener(eventName, handler, element = document) {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

/**
 * Animated Cursor
 * Replaces the native cursor with a custom animated cursor.
 */
export default function AnimatedCursor({
    color = '238, 131, 24',
    outerAlpha = 0.5,
    innerSize = 8,
    outerSize = 8,
    outerScale = 4,
    innerScale = 0.7,
}) {
    const cursorOuterRef = useRef();
    const cursorInnerRef = useRef();
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isActiveClickable, setIsActiveClickable] = useState(false);
    let endX = useRef(0);
    let endY = useRef(0);

    const onMouseMove = useCallback(({ clientX, clientY }) => {
        setCoords({ x: clientX, y: clientY });
        cursorInnerRef.current.style.top = clientY + 'px';
        cursorInnerRef.current.style.left = clientX + 'px';
        endX.current = clientX;
        endY.current = clientY;
    }, []);

    const animateOuterCursor = useCallback(
        (time) => {
            if (previousTimeRef.current !== undefined) {
                coords.x += (endX.current - coords.x) / 8;
                coords.y += (endY.current - coords.y) / 8;
                cursorOuterRef.current.style.top = coords.y + 'px';
                cursorOuterRef.current.style.left = coords.x + 'px';
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animateOuterCursor);
        },
        [coords] // Note: add coords as dependency
    );

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateOuterCursor);
        return () => cancelAnimationFrame(requestRef.current); // Ensure cleanup is a function
    }, [animateOuterCursor]);

    const onMouseDown = useCallback(() => setIsActive(true), []);
    const onMouseUp = useCallback(() => setIsActive(false), []);
    const onMouseEnter = useCallback(() => setIsVisible(true), []);
    const onMouseLeave = useCallback(() => setIsVisible(false), []);

    useEventListener('mousemove', onMouseMove, document);
    useEventListener('mousedown', onMouseDown, document);
    useEventListener('mouseup', onMouseUp, document);
    useEventListener('mouseenter', onMouseEnter, document);
    useEventListener('mouseleave', onMouseLeave, document);

    useEffect(() => {
        if (isActive) {
            cursorInnerRef.current.style.transform = `scale(${innerScale})`;
            cursorOuterRef.current.style.transform = `scale(${outerScale})`;
        } else {
            cursorInnerRef.current.style.transform = 'scale(1)';
            cursorOuterRef.current.style.transform = 'scale(1)';
        }
    }, [innerScale, outerScale, isActive]);

    useEffect(() => {
        if (isActiveClickable) {
            cursorInnerRef.current.style.transform = `scale(${
                innerScale * 1.3
            })`;
            cursorOuterRef.current.style.transform = `scale(${
                outerScale * 1.4
            })`;
        }
    }, [innerScale, outerScale, isActiveClickable]);

    useEffect(() => {
        if (isVisible) {
            cursorInnerRef.current.style.opacity = 1;
            cursorOuterRef.current.style.opacity = 1;
        } else {
            cursorInnerRef.current.style.opacity = 0;
            cursorOuterRef.current.style.opacity = 0;
        }
    }, [isVisible]);

    useEffect(() => {
        const clickables = document.querySelectorAll(
            'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
        );
        const handleMouseOver = () => setIsActive(true);
        const handleClick = () => {
            setIsActive(true);
            setIsActiveClickable(false);
        };
        const handleMouseDown = () => setIsActiveClickable(true);
        const handleMouseUp = () => setIsActive(true);
        const handleMouseOut = () => {
            setIsActive(false);
            setIsActiveClickable(false);
        };

        clickables.forEach((el) => {
            el.style.cursor = 'none';

            el.addEventListener('mouseover', handleMouseOver);
            el.addEventListener('click', handleClick);
            el.addEventListener('mousedown', handleMouseDown);
            el.addEventListener('mouseup', handleMouseUp);
            el.addEventListener('mouseout', handleMouseOut);
        });

        return () => {
            clickables.forEach((el) => {
                el.removeEventListener('mouseover', handleMouseOver);
                el.removeEventListener('click', handleClick);
                el.removeEventListener('mousedown', handleMouseDown);
                el.removeEventListener('mouseup', handleMouseUp);
                el.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, [isActive]);

    const styles = {
        cursor: {
            zIndex: 999,
            position: 'fixed',
            opacity: 1,
            pointerEvents: 'none',
            transition:
                'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
        },
        cursorInner: {
            position: 'fixed',
            borderRadius: '50%',
            width: innerSize,
            height: innerSize,
            pointerEvents: 'none',
            backgroundColor: `rgba(${color}, 1)`,
            transition:
                'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
        },
        cursorOuter: {
            position: 'fixed',
            borderRadius: '50%',
            pointerEvents: 'none',
            width: outerSize,
            height: outerSize,
            backgroundColor: `rgba(${color}, ${outerAlpha})`,
            transition:
                'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
        },
    };

    return (
        <Fragment>
            <div ref={cursorOuterRef} style={styles.cursorOuter} />
            <div ref={cursorInnerRef} style={styles.cursorInner} />
        </Fragment>
    );
}
