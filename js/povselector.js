//  POV IDs
const povs = ["pov1", "pov2", "pov3", "pov4"];
let currentPovIndex = 0;

// Function to update the POVs display
function showPov(index) {
    currentPovIndex = (index + povs.length) % povs.length;

    povs.forEach((povId, i) => {
        const pov = document.getElementById(povId);
        if (i === currentPovIndex) pov.classList.add("active");
        else pov.classList.remove("active");
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    showPov(0);

    document.getElementById("leftarrow").addEventListener("click", () => {
        showPov(currentPovIndex - 1);
    });

    document.getElementById("rightarrow").addEventListener("click", () => {
        showPov(currentPovIndex + 1);
    });
});