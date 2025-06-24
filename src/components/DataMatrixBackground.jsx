import React, { useEffect, useRef } from 'react';

const DataMatrixBackground = React.memo(({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    const isDarkMode = theme === 'dark';

    const config = {
      font_size: 16,
      character_set: '01',
      trail_color: isDarkMode ? 'rgba(10, 25, 47, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      lead_character_color: isDarkMode ? '#fafafa' : '#2e1065',
      trail_character_color: isDarkMode ? 'rgba(52, 211, 153, 0.4)' : 'rgba(109, 40, 217, 0.4)',
      speed_min: 2,
      speed_max: 100000, 
    };
    
    let animationFrameId;
    let columns;
    let drops;

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      columns = Math.floor(canvas.width / config.font_size);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = {
          y: Math.random() * canvas.height,
          speed: Math.random() * (config.speed_max - config.speed_min) + config.speed_min,
        };
      }
    };

    const draw = () => {
      context.fillStyle = config.trail_color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = `${config.font_size}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = config.character_set[Math.floor(Math.random() * config.character_set.length)];
        
        context.fillStyle = config.lead_character_color;
        context.fillText(text, i * config.font_size, drops[i].y);
        
        context.fillStyle = config.trail_character_color;
        context.fillText(text, i * config.font_size, drops[i].y - config.font_size);

        drops[i].y += drops[i].speed;

        if (drops[i].y > canvas.height + config.font_size) {
           drops[i].y = 0 - Math.random() * 200;
           drops[i].speed = Math.random() * (config.speed_max - config.speed_min) + config.speed_min;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    window.addEventListener('resize', setup);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, [theme]);
  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" />;
});

export default DataMatrixBackground;