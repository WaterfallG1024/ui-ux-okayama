import { useEffect, useRef, useState, useCallback } from 'react';

export const useParallax = () => {
  const sceneRef = useRef(null);
  const requestRef = useRef();

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // iOS向けジャイロパーミッションの状態管理
  // 'unknown' | 'prompt' | 'granted' | 'denied' | 'not-needed'
  const [gyroPermission, setGyroPermission] = useState(() => {
    try {
      return localStorage.getItem('okayama_gyro_permission') || 'unknown';
    } catch (e) {
      return 'unknown';
    }
  });

  // 状態が変更されたらLocalStorageに保存
  useEffect(() => {
    try {
      if (gyroPermission === 'granted' || gyroPermission === 'denied_permanent') {
        localStorage.setItem('okayama_gyro_permission', gyroPermission);
      }
    } catch (e) {
      console.warn('Failed to save gyro permission to localStorage', e);
    }
  }, [gyroPermission]);

  // ジャイロセンサーの傾きから目標角度を計算（最大45度で制限、スマホ横向き対応）
  const handleDeviceOrientation = useCallback((e) => {
    if (e.beta === null || e.gamma === null) return;

    let x = 0;
    let y = 0;

    let orientation = 0;
    if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number') {
      orientation = window.screen.orientation.angle;
    } else if (typeof window['orientation'] === 'number') {
      // 旧iOSSafari等のためのフォールバック (VSCodeの非推奨警告回避のためブラケット記法を使用)
      orientation = window['orientation'];
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
  }, []);

  // iOS向け: ユーザータップによるジャイロ許可リクエスト
  const requestGyroPermission = useCallback(async () => {
    // 開発用一時対応：Windows/AndroidなどrequestPermissionがない環境でもボタン動作をシミュレート
    if (typeof DeviceOrientationEvent === 'undefined' || typeof DeviceOrientationEvent.requestPermission !== 'function') {
      setGyroPermission('granted');
      return;
    }

    try {
      const result = await DeviceOrientationEvent.requestPermission();
      if (result === 'granted') {
        setGyroPermission('granted');
      } else {
        setGyroPermission('denied');
      }
    } catch (err) {
      console.error('ジャイロ許可リクエストに失敗:', err);
      setGyroPermission('denied');
    }
  }, []);

  useEffect(() => {
    // 許可状態の初期判定
    if (gyroPermission === 'unknown') {
      if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+: requestPermission API が存在する → ユーザー操作が必要
        setGyroPermission('prompt');
      } else {
        // Android や旧iOS、PC: 許可不要またはジャイロなし
        //setGyroPermission('not-needed');
        setGyroPermission('prompt');
      }
    }

    const isParallaxDisabled = gyroPermission === 'prompt' || gyroPermission === 'unknown' || gyroPermission === 'denied' || gyroPermission === 'denied_permanent';

    // マウスカーソルの位置からパララックスの目標角度を計算
    const handleMouseMove = (e) => {
      if (isParallaxDisabled) return;
      const { innerWidth, innerHeight } = window;
      target.current.x = ((e.clientX / innerWidth) - 0.5) * 20;
      target.current.y = ((e.clientY / innerHeight) - 0.5) * 20;
    };

    // タッチデバイスでのスワイプ位置から目標角度を計算
    const handleTouchMove = (e) => {
      if (isParallaxDisabled) return;
      const { innerWidth, innerHeight } = window;
      const touch = e.touches[0];
      target.current.x = ((touch.clientX / innerWidth) - 0.5) * 20;
      target.current.y = ((touch.clientY / innerHeight) - 0.5) * 20;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (gyroPermission === 'granted' || gyroPermission === 'not-needed') {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    // 慣性（イージング）を持たせて現在の角度を目標角度に近づけるアニメーションループ
    const updateParallax = () => {
      if (!isParallaxDisabled) {
        current.current.x += (target.current.x - current.current.x) * 0.05;
        current.current.y += (target.current.y - current.current.y) * 0.05;

        if (sceneRef.current) {
          sceneRef.current.style.transform = `rotateX(${-current.current.y}deg) rotateY(${current.current.x}deg)`;
        }
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
  }, [gyroPermission, handleDeviceOrientation]);

  return { sceneRef, gyroPermission, setGyroPermission, requestGyroPermission };
};
