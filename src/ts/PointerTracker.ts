export default class PointerTracker {
    elements: transformElement[];
    max: number;
    ticking: boolean;
    constructor() {
        this.elements = this.getElements();

        this.max = 20;
        this.ticking = false;
    }

    getElements = () => {
        const array: transformElement[] = [];

        document.querySelectorAll(".frame").forEach((element: HTMLElement) => {
            array.push({
                top: element.offsetTop,
                left: element.offsetLeft,
                height: element.offsetHeight,
                width: element.offsetWidth,
                element,
            });
        });

        return array;
    };

    transform = (
        xCord: number,
        yCord: number,
        transformElem: transformElement
    ) => {
        const { max } = this;

        // used offset instead of getBoundingClientRect because they're fixed
        const x = -(yCord - transformElem.top - transformElem.height / 2) / max;
        const y = (xCord - transformElem.left - transformElem.width / 2) / max;

        transformElem.element.style.setProperty("--x", `${x}deg`);
        transformElem.element.style.setProperty("--y", `${y}deg`);
    };

    handleMove = (x: number, y: number) => {
        const { elements } = this;
        elements.forEach((element) => {
            this.transform(x, y, element);
        });
    };

    handleMouseMove = (event: MouseEvent) => {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                this.handleMove(event.clientX, event.clientY);
                this.ticking = false;
            });
        }
    };

    handleTouchMove = (event: TouchEvent) => {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                this.handleMove(
                    event.touches[0].clientX,
                    event.touches[0].clientY
                );
                this.ticking = false;
            });
        }
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
