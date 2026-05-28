import { useEffect, useRef } from 'react';

export const useParallax = () => {
  const sceneRef = useRef(null);
  const requestRef = useRef();

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // マウスカーソルの位置からパララックスの目標角度を計算
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      target.current.x = ((e.clientX / innerWidth) - 0.5) * 20;
      target.current.y = ((e.clientY / innerHeight) - 0.5) * 20;
    };

    // タッチデバイスでのスワイプ位置から目標角度を計算
    const handleTouchMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const touch = e.touches[0];
      target.current.x = ((touch.clientX / innerWidth) - 0.5) * 20;
      target.current.y = ((touch.clientY / innerHeight) - 0.5) * 20;
    };

    // ジャイロセンサーの傾きから目標角度を計算（最大45度で制限、スマホ横向き対応）
    const handleDeviceOrientation = (e) => {
      if (e.beta === null || e.gamma === null) return;

      let x = 0;
      let y = 0;

      let orientation = window.orientation || 0;
      if (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined) {
        orientation = window.screen.orientation.angle;
      }

      if (orientation === 90) {
        x = e.beta;
        y = -e.gamma - 45;
      } else if (orientation === -90 || orientation === 270) {
        x = -e.beta;
        y = e.gamma - 45;
      } else {
        x = e.gamma;
        y = e.beta - 45;
      }

      const clampedX = Math.max(-45, Math.min(45, x));
      const clampedY = Math.max(-45, Math.min(45, y));

      target.current.x = (clampedX / 45) * 20;
      target.current.y = (clampedY / 45) * 20;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    // 慣性（イージング）を持たせて現在の角度を目標角度に近づけるアニメーションループ
    const updateParallax = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;

      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${-current.current.y}deg) rotateY(${current.current.x}deg)`;
      }

      requestRef.current = requestAnimationFrame(updateParallax);
    };

    requestRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return sceneRef;
};
