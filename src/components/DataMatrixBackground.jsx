import React, { useEffect, useState, useMemo } from 'react';

const CHARACTERS = '0110101011101SQLPYTHON ETL {}[]()<> BI /|\\*+-.=';

const DataMatrixBackground = React.memo(() => {
  const [columns, setColumns] = useState([]);

  const characterSet = useMemo(() => CHARACTERS.split(''), []);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 16); 

    setColumns(
      Array(columnCount).fill(0).map(() => ({
        y: Math.random() * -window.innerHeight, 
        chars: Array(Math.floor(Math.random() * 20) + 10).fill(0).map(() =>
          characterSet[Math.floor(Math.random() * characterSet.length)]
        ),
      }))
    );

    const interval = setInterval(() => {
      setColumns(prevColumns =>
        prevColumns.map(col => {
          let newY = col.y + 16; 
          if (newY > window.innerHeight) {
            newY = Math.random() * -window.innerHeight;
          }
          return { ...col, y: newY };
        })
      );
    }, 50); 
    return () => clearInterval(interval);
  }, [characterSet]); 

  return (
    <div className="absolute inset-0 overflow-hidden">
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute text-emerald-400/30 dark:text-emerald-400/20 font-mono text-sm"
          style={{
            left: `${i * 16}px`,
            top: `${col.y}px`,
            writingMode: 'vertical-rl', 
            textOrientation: 'upright',
          }}
        >
          {col.chars.join('')}
        </div>
      ))}
    </div>
  );
});

export default DataMatrixBackground;