export class CookingSteps {
    step: number;
    description: string;
    answer: string;
    cooktop: string;

    constructor(data: any) {
        this.step = data.step;
        this.description = data.description;
        this.answer = data.answer;
        this.cooktop = data.cooktop;
    }
}