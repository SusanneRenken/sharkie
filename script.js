function resizeCanvas() {
    const container = document.getElementById('canvas_container');
    const canvas = document.getElementById('canvas');
    const maxWidth = Math.min(container.clientWidth, window.innerWidth * 0.9);
    const maxHeight = (window.innerHeight - 60) * 0.9;

    let width = maxWidth;
    let height = width * (9/16);

    if (height > maxHeight) {
        height = maxHeight;
        width = height * (16/9);
    }

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
}

window.addEventListener('resize', resizeCanvas);

