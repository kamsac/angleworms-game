export default class AiInputReflex {
    private fatigue: number;
    private changeDirectionCost: number;
    private restPerMove: number;

    public constructor(changeDirectionCost: number, restPerMove: number) {
        this.fatigue = 0;
        this.changeDirectionCost = changeDirectionCost;
        this.restPerMove = restPerMove;
    }

    public getFatigue(): number {
        return this.fatigue;
    }

    public getTiredBecauseOfChangeDirection(): void {
        this.fatigue += this.changeDirectionCost;
    }

    public getRestBecauseMove(): void {
        this.fatigue -= this.restPerMove;
        if (this.fatigue < 0) {
            this.fatigue = 0;
        }
    }
}
