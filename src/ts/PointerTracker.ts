export default class PointerTracker {
    elements: NodeListOf<HTMLElement>;
    max: number;
    constructor() {
        this.elements = document.querySelectorAll(".frame");
        this.max = 20;
    }

    transform = (xCord: number, yCord: number, element: HTMLElement) => {
        const { max } = this;

        // used offset instead of getBoundingClientRect because they're fixed
        const x = -(yCord - element.offsetTop - element.offsetHeight / 2) / max;
        const y = (xCord - element.offsetLeft - element.offsetWidth / 2) / max;

        element.style.transform = `perspective(500px) rotateX(${x}deg) rotateY(${y}deg)`;
    };

    handleMove = (x: number, y: number) => {
        const { elements } = this;
        elements.forEach((element) => {
            this.transform(x, y, element);
        });
    };

    handleMouseMove = (event: MouseEvent) => {
        this.handleMove(event.clientX, event.clientY);
    };

    handleTouchMove = (event: TouchEvent) => {
        this.handleMove(event.touches[0].clientX, event.touches[0].clientY);
    };

    attach = () => {
        const options = { passive: true };

        window.addEventListener("mousemove", this.handleMouseMove, options);
        window.addEventListener("touchmove", this.handleTouchMove, options);
    };

    detach = () => {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("touchmove", this.handleTouchMove);
    };
}
