import { DataManager } from "./DataManager";
import { CookingSteps } from "../objects/CookingSteps.ts";

export class CookingStepsManager extends DataManager {
    steps: CookingSteps[] = [];

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.steps = [];
    }

    loadSteps() {
        super.loadJSON('steps', '/data/cooking_steps.json')
        this.scene.load.start()
    }

    processData() {
        const stepsData = super.getJSON('steps');

        if (stepsData) {
            stepsData.forEach((data) => {
                this.steps.push(new CookingSteps(data));
            });
            // console.log("Processed Steps:", this.steps)
        } else {
            console.error('Failed to load steps data.')
        }
    }
}