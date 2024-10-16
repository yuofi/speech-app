import anime from 'animejs';

export function animateRectangles(rectRefs) {
  rectRefs.forEach((rectRef) => {
    const rectElement = rectRef.current;
    if (!rectElement) return;

    const originalHeight = parseFloat(rectElement.getAttribute('height'));
    const originalY = parseFloat(rectElement.getAttribute('y')) || 0;

    rectElement.setAttribute('data-original-height', originalHeight);
    rectElement.setAttribute('data-original-y', originalY);

    function animate() {
      const scaleFactor = Math.random() + 0.3;
      const newHeight = originalHeight * scaleFactor;
      const heightDiff = newHeight - originalHeight;
      const newY = originalY - heightDiff;

      anime({
        targets: rectElement,
        height: [
          { value: newHeight, duration: 1000, easing: 'easeInOutQuad' },
          { value: originalHeight, duration: 1000, easing: 'easeInOutQuad' },
        ],
        y: [
          { value: newY, duration: 1000, easing: 'easeInOutQuad' },
          { value: originalY, duration: 1000, easing: 'easeInOutQuad' },
        ],
        delay: Math.random() * 2000,
        complete: () => {
          setTimeout(animate, 2000 + Math.random() * 3000);
        },
      });
    }

    animate();
  });
}