import { Ladder } from "./Ladder";
export interface IPoints {
    ladder: Ladder;
    earnedPoints: number;
    remainingPointsToPlatinum: number;
    dateLimitToPlatinum: string | null;
    availablePoints: number;
    expiringPoints: number | null;
    expiringAt: string | null;
}
