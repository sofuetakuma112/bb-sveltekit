export type Direction = 'left' | 'right' | 'up' | 'down';
export type SwipeHandler = (direction: Direction) => void;
export type CardLeftScreenHandler = (direction: Direction) => void;
export type SwipeRequirementFufillUpdate = (direction: Direction) => void;
export type SwipeRequirementUnfufillUpdate = () => void;

export interface API {
  swipe(dir?: Direction): Promise<void>;
  restoreCard(): Promise<void>;
}
