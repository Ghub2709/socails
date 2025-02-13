document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('counter');
    if (!counter) return;

    const targetNumber = 6;
    const duration = 7000; // 7 seconds
    const startTime = Date.now();
    
    function updateCounter() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeInOutCubic for smoother animation
        const easeInOutCubic = progress => {
            return progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        };
        
        const currentNumber = Math.round(easeInOutCubic(progress) * targetNumber);
        counter.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}); 