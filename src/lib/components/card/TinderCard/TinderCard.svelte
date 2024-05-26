<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import type {
    CardLeftScreenHandler,
    Direction,
    SwipeHandler,
    SwipeRequirementFufillUpdate,
    SwipeRequirementUnfufillUpdate
  } from './types';

  const settings = {
    maxTilt: 25,
    rotationPower: 50,
    swipeThreshold: 0.5
  };

  export let flickOnSwipe = true;
  export let onSwipe: SwipeHandler = () => {};
  export let onCardLeftScreen: CardLeftScreenHandler = () => {};
  export let className: string = '';
  export let preventSwipe: string[] = [];
  export let swipeRequirementType: 'velocity' | 'position' = 'velocity';
  // export let swipeThreshold = settings.swipeThreshold;
  export let onSwipeRequirementFulfilled: SwipeRequirementFufillUpdate = () => {};
  export let onSwipeRequirementUnfulfilled: SwipeRequirementUnfufillUpdate = () => {};

  const physics = {
    touchResponsive: {
      friction: 50,
      tension: 2000
    },
    animateOut: {
      friction: 30,
      tension: 400
    },
    animateBack: {
      friction: 10,
      tension: 200
    }
  };

  let element: HTMLDivElement;
  let startPositon = { x: 0, y: 0 };
  let lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
  let isClicking = false;
  let swipeThresholdFulfilledDirection = 'none';

  const xyrot = tweened([0, 0, 0], {
    duration: 400,
    easing: cubicOut
  });

  const windowWidth = tweened(0);
  const windowHeight = tweened(0);

  onMount(() => {
    const handleResize = () => {
      windowWidth.set(window.innerWidth);
      windowHeight.set(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  const pythagoras = (x: number, y: number) => {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  };

  const normalize = (vector: { x: number; y: number }) => {
    const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    return { x: vector.x / length, y: vector.y / length };
  };

  const animateOut = async (
    gesture: { x: number; y: number },
    windowHeight: number,
    windowWidth: number
  ) => {
    const diagonal = pythagoras(windowHeight, windowWidth);
    const velocity = pythagoras(gesture.x, gesture.y);
    const finalX = diagonal * gesture.x;
    const finalY = diagonal * gesture.y;
    const finalRotation = gesture.x * 45;
    const duration = diagonal / velocity;

    await xyrot.set([finalX, finalY, finalRotation], { duration: duration });

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(undefined);
      }, duration)
    );
  };

  const animateBack = async () => {
    await xyrot.set([0, 0, 0], { duration: 400, easing: cubicOut });
  };

  const getSwipeDirection = (property: { x: number; y: number }) => {
    if (Math.abs(property.x) > Math.abs(property.y)) {
      if (property.x > settings.swipeThreshold) {
        return 'right';
      } else if (property.x < -settings.swipeThreshold) {
        return 'left';
      }
    } else {
      if (property.y > settings.swipeThreshold) {
        return 'down';
      } else if (property.y < -settings.swipeThreshold) {
        return 'up';
      }
    }
    return 'none';
  };

  const gestureStateFromWebEvent = (
    ev: TouchEvent | MouseEvent,
    startPositon: { x: number; y: number },
    lastPosition: { dx: number; dy: number; vx: number; vy: number; timeStamp: number },
    isTouch: boolean
  ) => {
    let dx =
      isTouch && (ev.type === 'touchstart' || ev.type === 'touchmove' || ev.type === 'touchend')
        ? (ev as TouchEvent).touches[0].clientX - startPositon.x
        : (ev as MouseEvent).clientX - startPositon.x;
    let dy =
      isTouch && (ev.type === 'touchstart' || ev.type === 'touchmove' || ev.type === 'touchend')
        ? (ev as TouchEvent).touches[0].clientY - startPositon.y
        : (ev as MouseEvent).clientY - startPositon.y;

    if (startPositon.x === 0 && startPositon.y === 0) {
      dx = 0;
      dy = 0;
    }

    const vx = -(dx - lastPosition.dx) / (lastPosition.timeStamp - Date.now());
    const vy = -(dy - lastPosition.dy) / (lastPosition.timeStamp - Date.now());

    const gestureState = { dx, dy, vx, vy, timeStamp: Date.now() };
    return gestureState;
  };

  const handleSwipeReleased = async (gesture: {
    dx: number;
    dy: number;
    vx: number;
    vy: number;
  }) => {
    const dir = getSwipeDirection({
      x: swipeRequirementType === 'velocity' ? gesture.vx : gesture.dx,
      y: swipeRequirementType === 'velocity' ? gesture.vy : gesture.dy
    });

    if (dir !== 'none') {
      if (flickOnSwipe) {
        if (!preventSwipe.includes(dir)) {
          onSwipe(dir);

          const _gesture =
            swipeRequirementType === 'velocity'
              ? { x: gesture.vx, y: gesture.vy }
              : normalize({ x: gesture.dx, y: gesture.dy });

          await animateOut(_gesture, $windowHeight, $windowWidth);
          onCardLeftScreen(dir);
          return;
        }
      }
    }

    animateBack();
  };

  const handleMove = (gestureState: { dx: number; dy: number; vx: number; vy: number }) => {
    if (onSwipeRequirementFulfilled || onSwipeRequirementUnfulfilled) {
      const dir = getSwipeDirection({
        x: swipeRequirementType === 'velocity' ? gestureState.vx : gestureState.dx,
        y: swipeRequirementType === 'velocity' ? gestureState.vy : gestureState.dy
      });
      if (dir !== swipeThresholdFulfilledDirection) {
        swipeThresholdFulfilledDirection = dir;
        if (swipeThresholdFulfilledDirection === 'none') {
          onSwipeRequirementUnfulfilled();
        } else {
          onSwipeRequirementFulfilled(dir as Direction);
        }
      }
    }

    let rot = gestureState.vx * 15;
    if (isNaN(rot)) rot = 0;
    rot = Math.max(Math.min(rot, settings.maxTilt), -settings.maxTilt);
    xyrot.set([gestureState.dx, gestureState.dy, rot], { duration: 50, easing: cubicOut });
  };

  const onMouseDown = (ev: MouseEvent) => {
    isClicking = true;
    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, false);
    lastPosition = gestureState;
    startPositon = { x: ev.clientX, y: ev.clientY };
  };

  const onMouseMove = (ev: MouseEvent) => {
    if (!isClicking) return;
    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, false);
    lastPosition = gestureState;
    handleMove(gestureState);
  };

  const onMouseUp = (ev: MouseEvent) => {
    if (!isClicking) return;
    isClicking = false;
    handleSwipeReleased(lastPosition);
    startPositon = { x: 0, y: 0 };
    lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
  };

  const onTouchStart = (ev: TouchEvent) => {
    if (!(ev.target as HTMLElement).className.includes('pressable') && ev.cancelable) {
      ev.preventDefault();
    }

    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, true);
    lastPosition = gestureState;
    startPositon = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
  };

  const onTouchMove = (ev: TouchEvent) => {
    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, true);
    lastPosition = gestureState;
    handleMove(gestureState);
  };

  const onTouchEnd = (ev: TouchEvent) => {
    handleSwipeReleased(lastPosition);
    startPositon = { x: 0, y: 0 };
    lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
  };

  export const swipe = async (dir: Direction = 'right') => {
    onSwipe(dir);
    const power = 1.3;
    const disturbance = (Math.random() - 0.5) / 2;
    if (dir === 'right') {
      await animateOut({ x: power, y: disturbance }, $windowHeight, $windowWidth);
    } else if (dir === 'left') {
      await animateOut({ x: -power, y: disturbance }, $windowHeight, $windowWidth);
    } else if (dir === 'up') {
      await animateOut({ x: disturbance, y: -power }, $windowHeight, $windowWidth);
    } else if (dir === 'down') {
      await animateOut({ x: disturbance, y: power }, $windowHeight, $windowWidth);
    }
    onCardLeftScreen(dir);
  };

  export const restoreCard = async () => {
    await animateBack();
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={element}
  class={className}
  on:mousedown={onMouseDown}
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
  on:touchstart={onTouchStart}
  on:touchmove={onTouchMove}
  on:touchend={onTouchEnd}
  style="transform: translate3d({$xyrot[0]}px, {$xyrot[1]}px, 0px) rotate({$xyrot[2]}deg);"
>
  <slot></slot>
</div>

<style>
  div {
    touch-action: none;
  }
</style>
