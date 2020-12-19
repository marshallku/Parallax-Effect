function random(): number {
    return Math.random() * 100;
}

export default function star(): SVGSVGElement {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    star.setAttributeNS(null, "width", "100%");
    star.setAttributeNS(null, "height", "100%");
    star.setAttributeNS(null, "preserveAspectRatio", "none");

    for (let i = 0; i < 200; i++) {
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttributeNS(null, "cx", `${random()}%`);
        circle.setAttributeNS(null, "cy", `${random()}%`);
        circle.setAttributeNS(null, "r", `${Math.random() + 0.5}`);

        star.append(circle);
    }

    return star;
}
