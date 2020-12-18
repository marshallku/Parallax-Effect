export default function optimizeAnimation(callback: Function) {
    let ticking = false;

    return () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
        }
    };
}
