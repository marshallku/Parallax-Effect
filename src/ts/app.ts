import optimizeAnimation from "./optimizeAnimation";
import smoothScroll from "./smoothScroll";
import logo from "./logo";
import star from "./star";
import PointerTracker from "./PointerTracker";

const screenSize = {
    vw: 0,
    vh: 0,
};
const moonTransform = {
    x: 0,
    y: 0,
    scale: 1,
};
const tmpMoonTransform = {
    x: 0,
};

const sky = document.getElementById("sky");
const city = document.getElementById("city");
const moon = document.getElementById("moon");
const moonGlow = document.getElementById("moon-g");
const castle = document.getElementById("moon-c");
const title = document.getElementById("title");
const iu = document.getElementById("iu");
const logoElem = document.getElementById("logo");
const frames = document.getElementById("frames");
const stars = document.getElementById("star");

const tracker = new PointerTracker();

function init() {
    // Append logo
    const svgLogo = logo();
    const forFilter = logo();

    forFilter.classList.add("filter");

    logoElem.append(svgLogo);
    logoElem.append(forFilter);

    tracker.attach();

    // Set ScreenSize
    setScreenSize();

    // Add event listeners
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

    window.addEventListener(
        "load",
        () => {
            setTimeout(() => {
                // Scroll To Top
                window.scrollTo(0, 0);

                // Create starry background
                for (let i = 0; i < 3; i++) {
                    stars.append(star());
                }

                // Remove Loader
                document.getElementById("loader").classList.add("done");
                setTimeout(() => {
                    document.getElementById("loader").remove();
                }, 500);
            }, 30);
        },
        { passive: true, once: true }
    );

    document.getElementById("autoScroll").addEventListener("click", () => {
        window.scroll(0, 0);
        smoothScroll(
            document.documentElement.scrollHeight - 100 * screenSize.vh
        );
    });
}

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
        frames.classList.remove("reveal");
        stars.classList.remove("reveal");

        iu.style.opacity = "0";
        logoElem.style.opacity = "0";
        logoElem.classList.remove("on");
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

        moon.style.transform = `matrix(${moonTransform.scale}, 0, 0, ${moonTransform.scale}, ${moonTransform.x}, ${moonTransform.y})`;
    } else if (scrollY <= 150 * vh) {
        const currentY = scrollY - 100 * vh;

        frames.classList.remove("reveal");
        stars.classList.remove("reveal");

        logoElem.style.opacity = "0";
        logoElem.classList.remove("on");
        castle.style.opacity = "0.5";
        moonGlow.style.opacity = "1";

        tmpMoonTransform.x = moonTransform.x - currentY * 0.1;
        moon.style.transform = `matrix(${moonTransform.scale}, 0, 0, ${moonTransform.scale}, ${tmpMoonTransform.x}, ${moonTransform.y})`;

        iu.style.opacity = `${currentY / (50 * vh)}`;
    } else if (scrollY <= 200 * vh) {
        frames.classList.add("reveal");
        stars.classList.add("reveal");

        iu.style.opacity = "1";
        moon.style.transform = `matrix(${moonTransform.scale}, 0, 0, ${moonTransform.scale}, ${tmpMoonTransform.x}, ${moonTransform.y})`;
        logoElem.style.opacity = "0";
    } else if (scrollY <= 250 * vh) {
        const currentY = scrollY - 200 * vh;
        const percent50 = currentY / (50 * vh);
        const moonScale = Math.max(
            moonTransform.scale - percent50 * moonTransform.scale,
            0
        );

        frames.classList.remove("reveal");
        stars.classList.remove("reveal");

        iu.style.opacity = `${1 - percent50}`;
        logoElem.style.opacity = `${percent50}`;
        logoElem.classList.remove("on");
        moon.style.transform = `matrix(${moonScale}, 0, 0, ${moonScale}, ${tmpMoonTransform.x}, ${moonTransform.y})`;
    } else {
        iu.style.opacity = "0";
        logoElem.style.opacity = "1";
        logoElem.classList.add("on");
        moon.style.transform = `matrix(0, 0, 0, 0, 0, 0)`;
    }
}

init();
