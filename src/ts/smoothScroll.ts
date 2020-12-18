export default function smoothScroll(to: number, duration = 20000) {
    function animation() {
        const now = (performance.now() - startTime) / duration;
        const progress = transition(now);

        if (1 > now) {
            window.requestAnimationFrame(animation);
            window.scrollTo(0, from + (to - from) * progress);
        } else {
            const { scrollY } = window;
            if (typeof to !== "number") {
                const { offsetTop } = to;
                if (scrollY < offsetTop - 100 || scrollY > offsetTop + 100) {
                    window.scrollTo(0, to);
                    smoothScroll(to);
                }
            } else {
                window.scrollTo(0, to);
            }
        }
    }

    const from = window.scrollY;
    const transition = (x: number): number => {
        return x;
    };
    const startTime = performance.now();
    animation();
}
