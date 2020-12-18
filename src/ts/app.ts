import optimizeAnimation from "./optimizeAnimation";
import smoothScroll from "./smoothScroll";

const screenSize = {
    vw: 0,
    vh: 0,
};

const sky = document.getElementById("sky");
const city = document.getElementById("city");
const moon = document.getElementById("moon");
const moonGlow = document.getElementById("moon-g");
const castle = document.getElementById("moon-c");
const title = document.getElementById("title");
const iu = document.getElementById("iu");

let moonTransform = {
    x: 0,
    y: 0,
    scale: 1,
};

function setScreenSize() {
    screenSize.vw =
        Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        ) / 100;
    screenSize.vh =
        Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        ) / 100;
}

function scrollEffect() {
    const { scrollY } = window;
    const { vw, vh } = screenSize;
    const largerPart = Math.max(vw, vh);

    if (scrollY <= 100 * vh) {
        iu.style.opacity = "0";
        sky.style.transform = `translate3d(0, ${-0.25 * scrollY}px, 0)`;

        if (scrollY <= 60 * vh) {
            const halfVh = 30 * vh;

            city.style.transform = `translate3d(0, ${-0.1 * scrollY}px, 0)`;
            title.style.transform = `translate3d(-50%, -50%, 0) scale(${
                1 + 0.001 * scrollY
            })`;

            moonTransform.x = ((-50 * vw - 8.5 * vh) / (60 * vh)) * scrollY;
            moonTransform.y =
                ((5 * largerPart) / Math.pow(halfVh, 2)) *
                    Math.pow(scrollY - halfVh, 2) -
                5 * largerPart;
            moonTransform.scale = 1;

            castle.style.opacity = "0";
            moonGlow.style.opacity = "0";
        } else {
            const currentY = scrollY - 60 * vh;
            const remainY = 40 * vh;

            castle.style.opacity = `${currentY / remainY / 2}`;
            moonGlow.style.opacity = `${currentY / remainY}`;

            moonTransform.x = -50 * vw - 8.5 * vh;
            moonTransform.y = currentY * 0.9;
            moonTransform.scale = 1 + currentY * 0.01;
        }

        moon.style.transform = `translate3d(${moonTransform.x}px, ${moonTransform.y}px, 0) scale(${moonTransform.scale})`;
    } else if (scrollY <= 150 * vh) {
        const currentY = scrollY - 100 * vh;

        castle.style.opacity = "0.5";
        moonGlow.style.opacity = "1";
        moon.style.transform = `translate3d(${
            moonTransform.x - currentY * 0.1
        }px, ${moonTransform.y}px, 0) scale(${moonTransform.scale})`;

        iu.style.opacity = `${currentY / (50 * vh)}`;
    } else if (scrollY <= 200 * vh) {
        iu.style.opacity = "1";
    }
}

setScreenSize();

window.addEventListener(
    "scroll",
    optimizeAnimation(() => {
        scrollEffect();
    }),
    { passive: true }
);

window.addEventListener(
    "resize",
    optimizeAnimation(() => {
        setScreenSize();
    }),
    { passive: true }
);

window.addEventListener("load", () => {
    window.scroll(0, 0);
});

window.addEventListener("click", () => {
    window.scroll(0, 0);
    smoothScroll(document.documentElement.scrollHeight);
});
